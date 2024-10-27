import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import '@/index.css'

import { Provider } from 'react-redux'//引入reduex
import store from './store' // 引入 Redux store，請確認路徑是否正確

import {RouterProvider} from 'react-router-dom';//引入router provider
import router from '@/router'//引入router配置檔案

createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
)
