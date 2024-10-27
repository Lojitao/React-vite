//組合reduex子模塊 ＋ 導出store實例
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './modules/user'

export default configureStore({
  reducer:{
    user:userReducer
  }
})