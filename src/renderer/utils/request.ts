import axios, { AxiosRequestConfig, Method } from 'axios'

import CRYPTO from './crypto'

const { weapi, linuxApi } = CRYPTO
// const host = 'music.163.com'
const host = 'localhost:5001'

const request = (method: Method, path: string, data: any, crypto = 'weapi') => {
  let cryptoReq = {}
  let url = `http://${host}${path}`
  switch (crypto) {
    case 'linuxApi':
      cryptoReq = linuxApi({
        method,
        url: url.replace(/\w*api/, 'api'),
        params: data
      })
      url = `http://${host}/api/linux/forward`
      break
    case 'eapi':
      break
    default:
      cryptoReq = weapi(data)
      break
  }
  const options: AxiosRequestConfig = {
    method,
    url,
    withCredentials: true,
    headers: {
      Accept: 'application/jsoncharset=UTF-8',
      'Accept-Language': 'zh-CN,zhq=0.8,glq=0.6,zh-TWq=0.4',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: data
  }
  return axios(options)
}

const post = (path: string, data: any, crypto?: string) => {
  return request('POST', path, data, crypto)
}

const get = (path: string, data: any) => {
  return request('GET', path, data)
}

export { request, post, get }

// import Axios from 'axios'

// const request = Axios.create({
//   withCredentials: true,
//   baseURL: 'http://localhost:5001/'
// })

// request.interceptors.request.use(req => req, err => Promise.reject(err))

// request.interceptors.response.use(res => {
//   if (res.data.code === 200) {
//     return res.data
//   } else {
//     return false
//   }
// }, err => Promise.reject(err))

// export const post = (path: string, data: any, crypto?: string) => {
//   return request({
//     methods: 'POST',
//     url: path,
//     data,
//     crypto
//   })
// }

// export const get = (path: string, data: any) => {
//   return request({
//     methods: 'GET',
//     url: path,
//     data
//   })
// }

// export { post, get }
// export default request
