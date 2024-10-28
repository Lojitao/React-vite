import { Outlet } from 'react-router-dom';

import { Layout,Menu } from"antd"
const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    label:'首頁',
    key:'/'
  },
  {
    label:'文章列表',
    key:'/list'
  },
]

const LayoutPage = ()=>{
  return (
    <>
      <div className='flex'>
        <Sider>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
        </Sider>
        <div className="w-full bg-red h-100vh">
          <Outlet />
        </div>
      </div>
    </>
   
  )
}

export default LayoutPage
