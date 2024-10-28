import  { axiosInstance } from '@/utils/axiosInstance'


const user = {
  GetLists(params){
    return axiosInstance({
      url:"/admin/courses",
      method:'GET',
      params
    })
  }
}


export default user





