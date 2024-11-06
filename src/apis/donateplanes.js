import  { axiosInstance } from '@/utils/axiosInstance'

const donateplanes = {
  Load(params) {
    return axiosInstance({
      url: "/DonatePlans/publicload",
      method: "GET",
      params
    })
  },
  NormalLoad(params) {
    return axiosInstance({
      url: "/DonatePlans/PublicNormalLoad",
      method: "GET",
      params
    })
  },
  // Get(params) {
  //   return request({
  //     url: "/DonatePlans/get",
  //     method: "get",
  //     params
  //   })
  // }
}

export default donateplanes;
