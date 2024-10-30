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
  GetCourseById(params,allowGlobalErrorHandling = true){
    return axiosInstance({
      url:`admin/courses/${params}`,
      method:'GET',
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
  },
  UpdateCourse(params,data,allowGlobalErrorHandling = true){
    return axiosInstance({
      url:`admin/courses/${params}`,
      method:'PUT',
      data,
      allowGlobalErrorHandling
    })
  },
  
}


export default user





