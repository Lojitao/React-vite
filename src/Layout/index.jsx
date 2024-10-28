import { Outlet, useNavigate , useLocation } from 'react-router-dom';
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
  const navigate = useNavigate()
  
  const location = useLocation()
  const selectedKey = location.pathname

  function routerHandle(route){
    const path = route.key   
    navigate(path)
    // console.log('asdsad',route);
  }

  //獲取當前路徑


  return (
    <>
      <div className='flex'>
        <Sider>
          <div className="demo-logo-vertical" />
          <Menu onClick={routerHandle}
            selectedKeys={selectedKey}
            items={items} 
            theme="dark" mode="inline"  
          />
        </Sider>
        <div className="w-full bg-red h-100vh">
          <Outlet />
        </div>
      </div>
    </>
   
  )
}

export default LayoutPage
