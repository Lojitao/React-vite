import { Radio,Input,InputNumber,Upload, Breadcrumb,Card ,Form,Checkbox,Space, Table, Tag} from "antd"
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

  useEffect(()=>{
    async function loadLists(){
      const params = {
        currentPage: 1,
        pageSize: 10,
      };
      const res = await httpApis.course.GetLists(params);
      setLists(res.data); // 假設 `res` 是符合 Antd Table 格式的數據
    };

    // 調用異步函數
    loadLists();
  },[])

  return (
  <>
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
  </>
  )
}

export default List
