import  { axiosInstance } from '@/utils/axiosInstance'


const user = {
  GetLists(params,allowGlobalErrorHandling = true){
    return axiosInstance({
      url:"/admin/courses",
      method:'GET',
      params,
      allowGlobalErrorHandling
    })
  },
  AddCourse(data,allowGlobalErrorHandling = true){
    return axiosInstance({
      url:"/admin/courses",
      method:'POST',
      data,
      allowGlobalErrorHandling
    })
  }
}


export default user





