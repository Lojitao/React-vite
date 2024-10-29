import { Radio,Input,InputNumber,Upload,Select, message,Breadcrumb,Card ,Form,Checkbox,Space, Table, Tag,Modal ,Button} from "antd"
const { Column, ColumnGroup } = Table;
import { useState,useEffect } from "react"
import { Link } from "react-router-dom"
import httpApis from '@/apis'


//渲染後取得資料

const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const List = ()=>{
  const [lists,setLists] = useState([])
  const [categoryOptions,setCategoryOptions] = useState([])

  useEffect(()=>{
    
    async function loadCategorys(){
      const params = {
        currentPage: 1,
        pageSize: 100,
      };
      const res = await httpApis.category.GetCategorys(params);
      const options = res.data.map(res=>{
        return {
          label:res.name,
          value:res.id
        }
      })
      console.log('options',options);
      
      setCategoryOptions(options);
    };

    // 調用異步函數
    loadLists();
    loadCategorys()
  },[])

  async function loadLists(){
    const params = {
      currentPage: 1,
      pageSize: 10,
    };
    const res = await httpApis.course.GetLists(params);
    setLists(res.data); // 假設 `res` 是符合 Antd Table 格式的數據
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm(); // 使用useForm鉤子
  function toggleModal(){
    setIsModalOpen(!isModalOpen);
    form.resetFields()
  }
  async function validateForm(){
    try {
      const values = await form.validateFields();
      return values; // 驗證成功，返回表單值
    } catch {
      return false; // 驗證失敗返回 false
    }
  };
  async function handleOk(){
    const values = await validateForm();
    
    if (values){
      const res = await httpApis.course.AddCourse(values);
      if(res.status===201){
        message.success('新增成功！');
        loadLists()
      }
      form.resetFields(); // 重置表單
      toggleModal(false); // 關閉 Modal
    } 
  }


  function handleChange(){

  }

  return (
  <>
    <Button onClick={toggleModal}>新增</Button>
    <Table dataSource={lists} rowKey="id">
      <Column title="課程名稱" dataIndex="name" key="name" />
      <Column title="課程類別" dataIndex="categoryId" key="categoryId" />
      <Column title="授課老師" dataIndex={['user', 'username']} key="username" />
      <Column title="新增日期" dataIndex="createdAt" key="createdAt" />
      <Column title="是否推薦" dataIndex="recommended" key="recommended" 
        render={(recommended) => (recommended ? "是" : "否")} 
      />
      <Column title="Action" key="action"
        render={(_, record) => (
          <Space size="middle">
            <a>Invite {record.lastName}</a>
            <a>Delete</a>
          </Space>
        )}
      />
    </Table>
    {/* 彈窗 */}
    <Modal
      title="新增" 
      open={isModalOpen} 
      onOk={handleOk} 
      onCancel={toggleModal}
    >
      <Form  validateTrigger="onBlur"
        form={form} // 將 form 綁定到 Form 組件
        labelCol={{span: 4,}}
        wrapperCol={{span: 14,}}
        layout="horizontal"
        style={{maxWidth: 600}}
      >
        {/*課程名稱*/}
        <Form.Item label="課程名稱" name="name" 
          rules={[{required:true,message:"請輸入課程名稱"}]}
        >
          <Input></Input>
        </Form.Item>
        
        {/* 課程類別 */}
        <Form.Item label="課程類別" name="categoryId" rules={[{required:true,message:"請選擇課程名稱"}]}>
          {/* <InputNumber /> */}
          <Select
            placeholder="請選擇類別"
            style={{width: 120}}
            onChange={handleChange}
            options={categoryOptions}
          />
        </Form.Item>
      </Form>
    </Modal>
  </>
  )
}

export default List
