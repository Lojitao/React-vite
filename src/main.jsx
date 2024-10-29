// import { StrictMode } from 'react'//嚴格模式會讓api重覆請求兩次
import { createRoot } from 'react-dom/client'
import 'uno.css'; //uno.css

import store from './store' 
import { Provider } from 'react-redux'//引入reduex

import router from '@/router'//引入router配置檔案
import {RouterProvider} from 'react-router-dom';//引入router provider


createRoot(document.getElementById('root')).render(
  // <StrictMode> 
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  // </StrictMode>
)
