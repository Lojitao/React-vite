//此頁功能為配置路由
import Login from "@/pages/Login";
import Layout from "@/pages/Layout";

//引入router函數
import {createBrowserRouter} from "react-router-dom"

//創建router實例
const router = createBrowserRouter([
  {
    path:"/login",
    element:<Login />
  },
  {
    path:"/",
    element:<Layout />
  },
])

export default router