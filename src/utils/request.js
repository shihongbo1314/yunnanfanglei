import qs from 'qs'
import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
import { getToken, getNewToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  paramsSerializer: function (params) {
    return qs.stringify(params, { arrayFormat: 'brackets' })
  },
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  timeout: null // 请求超时时间
})

// request拦截器
/* service.interceptors.request.use(
 
 
) */

// response 拦截器
service.interceptors.response.use(
  response => {
    if (response.data.state == 204 && response.data.stateStr == "无内容" && response.request.responseURL.split('?')[0] == 'http://140.249.209.176:8084/LightningDetection/user-info/login') {
      Message({
        message: '登录失败',
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      /* console.log(router) */
      return response
    }

  },
  error => {
    // Do something with request error
    // console.log({ error }) // for debug
    return Promise.reject(error)
  }
)

export default service
