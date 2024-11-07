import  { axiosInstance } from '@/utils/axiosInstance'

const news = {
  Load(params) {
    return axiosInstance({
      url: "/newss/publicload",
      method: "GET",
      params
    })
  },
  Get(params) {
    return axiosInstance({
      url: "/newss/get",
      method: "GET",
      params
    })
  },
}

export default news;
