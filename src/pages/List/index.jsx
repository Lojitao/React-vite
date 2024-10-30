import { Radio,Input,InputNumber,Upload,Select, message,Breadcrumb,Card ,Form,Checkbox,Space, Table, Tag,Modal ,Button} from "antd"
import { useState,useEffect,useRef } from "react"
import httpApis from '@/apis'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const { Column, ColumnGroup } = Table;
const MySwal = withReactContent(Swal);


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
      options.push({
        label:'假類別',
        value:9999
      })    
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
   //根據 categoryId 返回中文名稱
  const getCategoryName = (categoryId) => {
    const category = categoryOptions.find(option => option.value === categoryId);
    return category ? category.label : "未知類別";
  };

  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState('');
  const [currentCourseId, setCurrentCourseId] = useState('');
  
  const [form] = Form.useForm(); // 使用useForm鉤子
  function closeModal(){
    setShowModal(false);
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
  function resetForm(){
    // 重置表單驗證
    form.resetFields(); 

    //清空相關判斷變數
    setModalAction('')
    setCurrentCourseId('')
  }
  async function handleAddOrSave(){
    const values = await validateForm();
    if (values){
      try{
        let res = null
        if(modalAction==='add')res = await httpApis.course.AddCourse(values);
        if(modalAction==='edit') res = await httpApis.course.UpdateCourse(currentCourseId,values);
        if(res.status===201 || res.status===200){
          resetForm()
          closeModal(); // 關閉 Modal
          MySwal.fire({
            title: '成功',
            text: `${modalAction==='add'?'新增':'更新'}成功`,
            icon: 'success',
            timer: 1200,           
            timerProgressBar: true,  
            showConfirmButton: false
          })
          loadLists()
        }
      }catch(error){
        console.log('error',error);
      }
    } 
  }
  async function openModal(type,courseId=null){
    setShowModal(true)
    setModalAction(type)
    if(type==='preview' || type==='edit'){
      setCurrentCourseId(courseId)
      const {data,status} = await httpApis.course.GetCourseById(courseId)
      if(status===200){
        form.setFieldsValue({
          name: data.name,
          categoryId: data.categoryId,
        });
      }
    }    
  }

  // 動態生成 Modal 底部按鈕
  const modalFooter = [
    <Button key="cancel" onClick={closeModal}>
      關閉
    </Button>,
    (modalAction === "add" || modalAction === "edit") && (
      <Button key="submit" type="primary" onClick={handleAddOrSave}>
        {modalAction === "add" ? "新增" : "儲存"}
      </Button>
    ),
  ].filter(Boolean); // 去除 undefined


  return (
  <>
    <Button onClick={()=>openModal('add')}>新增</Button>
    <Table dataSource={lists} rowKey="id">
      <Column title="課程名稱" dataIndex="name" key="name" />
      <Column title="課程類別" dataIndex="categoryId" key="categoryId" 
        render={(categoryId) => getCategoryName(categoryId)}
      />
      <Column title="授課老師" dataIndex={['user', 'username']} key="username" />
      <Column title="新增日期" dataIndex="createdAt" key="createdAt" />
      <Column title="是否推薦" dataIndex="recommended" key="recommended" 
        render={(recommended) => (recommended ? "是" : "否")} 
      />
      <Column title="操作" key="action"
        render={(_, record) => (
          <Space size="middle">
            <Button onClick={()=>openModal('edit',record.id)}>編輯</Button>
            <Button onClick={()=>openModal('preview',record.id)}>檢視</Button>
          </Space>
        )}
      />
    </Table>
    {/* 彈窗 */}
    <Modal
      title={
        modalAction === "add" ? "新增課程" :
        modalAction === "edit" ? "編輯課程" :
        "檢視課程"
      }
      open={showModal} 
      onCancel={closeModal}
      footer={modalFooter} // 使用動態生成的按鈕組
    >
      <Form  validateTrigger="onBlur"
        form={form} // 將 form 綁定到 Form 組件
        labelCol={{span: 4,}}
        wrapperCol={{span: 14,}}
        layout="horizontal"
        style={{maxWidth: 600}}
      >
        {/*課程名稱*/}
        <Form.Item label="課程名稱" name="name" disabled
          rules={[{required:true,message:"請輸入課程名稱"}]}
        >
          <Input disabled={modalAction === "preview"}></Input>
        </Form.Item>
        
        {/* 課程類別 */}
        <Form.Item label="課程類別" name="categoryId" rules={[{required:true,message:"請選擇課程名稱"}]}>
          {/* <InputNumber /> */}
          <Select disabled={modalAction === "preview"}
            placeholder="請選擇類別"
            style={{width: 120}}
            options={categoryOptions}
          />
        </Form.Item>
      </Form>
    </Modal>
  </>
  )
}

export default List
