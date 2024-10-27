import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import '@/index.css'

import {RouterProvider} from 'react-router-dom';//引入router provider
import router from '@/router'//引入router配置檔案

createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <RouterProvider router={router}/>
  </StrictMode>
)
