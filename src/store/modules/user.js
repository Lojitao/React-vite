//用戶相關的狀態管理
import { createSlice } from '@reduxjs/toolkit'
import httpApis from '@/apis'
import { setCookie , getCookie } from "@/utils"

const userStore = createSlice({
  name:'user',
  initialState:{//數據狀態
    token:getCookie('token') || '',
  },
  reducers:{//同步修改方法
    setToken(state,action){
      state.token = action.payload
      setCookie('token',action.payload)//數據持久化,使用cookie存入token
    }
  }
})

//異步處理
const fetchLogin = (loginForm)=>{
  return async(dispatch)=>{ 
    const res = await httpApis.user.LoginAPI(loginForm)
    dispatch(setToken(res.data))
  }
}


//解構出actionCreater
const { setToken } = userStore.actions

const userReducer = userStore.reducer

export { fetchLogin , setToken }
export default userReducer
