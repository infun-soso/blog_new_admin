import axios from 'axios'
import { message } from 'antd'

const instance = axios.create({
  baseURL: '',
  timeout: 10000,
  headers: {
    'Content-Type': "application/json;charset=utf-8",
  },
})

instance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  res => {
    let { data, status } = res
    if (status === 200) {
      return data
    }
    message.error(status)
    return Promise.reject(data)
  },
  error => {
    const { response } = error
    const { status, data } = response 
    message.error(status + ': ' + data.message)
    switch (status) {
      case 401:
        localStorage.removeItem('token')
        window.location.href = './#/login'
        break;
      case 504:
        message.error('代理请求失败')
        break;
      default:
        break;
    }
    return Promise.reject(error)
  }
)

export default instance