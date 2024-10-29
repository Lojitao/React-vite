import  { axiosInstance } from '@/utils/axiosInstance'


const category = {
  GetCategorys(params){
    return axiosInstance({
      url:"/admin/category",
      method:'GET',
      params
    })
  },
}


export default category





