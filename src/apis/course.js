import  { axiosInstance } from '@/utils/axiosInstance'


const user = {
  GetLists(params,allowGlobalErrorHandling = true){
    return axiosInstance({
      url:"/admin/courses",
      method:'GET',
      baseURL: import.meta.env.VITE_LOGIN_API,
      params,
      allowGlobalErrorHandling
    })
  },
  GetCourseById(params,allowGlobalErrorHandling = true){
    return axiosInstance({
      url:`admin/courses/${params}`,
      baseURL: import.meta.env.VITE_LOGIN_API,
      method:'GET',
      allowGlobalErrorHandling
    })
  },
  AddCourse(data,allowGlobalErrorHandling = true){
    return axiosInstance({
      url:"/admin/courses",
      method:'POST',
      baseURL: import.meta.env.VITE_LOGIN_API,
      data,
      allowGlobalErrorHandling
    })
  },
  UpdateCourse(params,data,allowGlobalErrorHandling = true){
    return axiosInstance({
      url:`admin/courses/${params}`,
      method:'PUT',
      baseURL: import.meta.env.VITE_LOGIN_API,
      data,
      allowGlobalErrorHandling
    })
  },
  
}


export default user





