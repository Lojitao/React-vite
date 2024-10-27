import  { axiosInstance } from '@/utils/axiosInstance'


const user = {
  LoginAPI(formData){
    return axiosInstance({
      url:"/admin/auth/sign_in",
      method:'POST',
      data:formData
    })
  }
}


export default user





