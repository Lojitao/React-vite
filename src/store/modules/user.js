//用戶相關的狀態管理
import { createSlice } from '@reduxjs/toolkit'
import httpApis from '@/apis'

const userStore = createSlice({
  name:'user',
  initialState:{//數據狀態
    token:'',
  },
  //同步修改方法
  reducers:{
    setToken(state,action){
      state.token = action.payload
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
