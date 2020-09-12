import Axios from 'axios'

const request = Axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:5001/'
})

request.interceptors.request.use(req => req, err => Promise.reject(err))

request.interceptors.response.use(res => {
  if (res.data.code === 200) {
    return res.data
  } else {
    return false
  }
}, err => Promise.reject(err))

export default request
