import axios from 'axios'
import store from '@/store'

const request = axios.create({
  timeout: 10000,
  baseURL: 'http://toutiao.itheima.net'
})
export default request
// 请求拦截器：请求做些事情
// cofig 是每一次请求的配置对象
request.interceptors.request.use(function (config) {
  const { getters, state } = store
  if (getters.isLogin) {
    config.headers.Authorization = `Bearea ${state.tokenObj.token}`
  }
  return config
}, function (err) {
  return Promise.reject(err)
})
