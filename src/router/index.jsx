//此頁功能為配置路由
import LayoutPage from "@/Layout";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import List from "@/pages/List";
import ProtectedRoute from "./protectedRoute"; // 引入 ProtectedRoute

//引入router函數
import {createBrowserRouter} from "react-router-dom"

//創建router實例
const router = createBrowserRouter([
  {
    path:"/login",
    element:<Login />,
  },
  {
    path:"/",
    // element:<LayoutPage />,
    element: (
      <ProtectedRoute> {/* 保護整個 LayoutPage */}
        <LayoutPage />
      </ProtectedRoute>
    ),
    children:[
      {
        index: true ,
        element:<Home />,
      },
      {
        path:"list",
        element:<List />,
      }
    ]
  },
])

export default router