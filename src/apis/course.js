import  { axiosInstance } from '@/utils/axiosInstance'


const user = {
  GetLists(params){
    return axiosInstance({
      url:"/admin/courses",
      method:'GET',
      params
    })
  },
  AddCourse(data){
    return axiosInstance({
      url:"/admin/courses",
      method:'POST',
      data
    })
  }
}


export default user





