import  { axiosInstance } from '@/utils/axiosInstance'


const category = {
  GetCategorys(params){
    return axiosInstance({
      url:"/admin/category",
      method:'GET',
      baseURL: import.meta.env.VITE_LOGIN_API,
      params
    })
  },
}


export default category





