import  { axiosInstance } from '@/utils/axiosInstance'

const banner = {
  LoadBanner(params){
    return axiosInstance({
      url: "/bannerss/publicload",
      method:'GET',
      params
    })
  },
}

export default banner





