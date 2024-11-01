//axios封裝處理
import axios from 'axios'
import { getCookie } from "@/utils"
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

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
  const { config, response } = error;

  if (config.allowGlobalErrorHandling) {
    console.log('response',response);
    if(response!== undefined){
      const {errors,message,status} = response.data
      if (status === 401) {
        // 針對 401 錯誤的客製化提示
        MySwal.fire({
          title: '未授權',
          text: '您的登入已過期，請重新登入。',
          icon: 'warning',
          confirmButtonText: '好的',
        }).then(() => {
          console.log('跳轉到登入頁');
          
          // TODO:可在此處執行跳轉到登入頁的邏輯
          // redirectToLogin(); // 使用自定義的跳轉函數
        });
      }  
      if (errors && errors.length > 0) {// 具體錯誤訊息
        MySwal.fire({
          title: '錯誤',
          html: errors.map(err => `<p>${err}</p>`).join(''),
          icon: 'error',
          confirmButtonText: '好的',
        });
      }
      if (message) {//通用錯誤訊息
        MySwal.fire({
          title: '錯誤',
          text: message,
          icon: 'error',
          confirmButtonText: '好的',
        });
      } 
    }else{
      MySwal.fire({
        title: '錯誤',
        text: '發生未知錯誤，請稍後重試。',
        icon: 'error',
        confirmButtonText: '好的',
      });
    }
  }
  return Promise.reject(error)
})



export { axiosInstance }
