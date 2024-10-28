//axios封裝處理
import axios from 'axios'
import { getCookie } from "@/utils"

//1.根域名配置/超時時間
const axiosInstance = axios.create({
  baseURL:'http://localhost:3039',
  timeout:5000
})



//2.請求攔截器/回應攔截器
axiosInstance.interceptors.request.use(
(config)=>{//插入自定義的配置[參數的處理]

  //判斷有無token
  const token = getCookie('token')
  if(token) config.headers.token = token;

  return config
}
,(error)=>{
  return Promise.reject(error)
})



axiosInstance.interceptors.response.use(
(response)=>{
  return response.data
}
,(error)=>{
  return Promise.reject(error)
})



export { axiosInstance }
