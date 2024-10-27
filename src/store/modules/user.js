//用戶相關的狀態管理
import { createSlice } from '@reduexjs/toolkit'

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

//解構出actionCreater
const { setToken } = userStore.actions

const userReducer = userStore.reducer

export { setToken }
export default userReducer
