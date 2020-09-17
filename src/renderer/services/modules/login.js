/**
 * @description 登录模块接口
 * @author typeofNaN
 * @time 2020-09-17
 */

import request from '@/utils/request'

class Login {
  /**
   * @description 邮箱登录
   * @author typeofNaN
   * @time 2020-09-17
   * @param { data } 登录数据
   */
  loginByEmail (data) {
    return request({
      url: '/login',
      methods: 'GET',
      params: data
    })
  }

  /**
   * @description 手机登录
   * @author typeofNaN
   * @time 2020-09-17
   * @param { data } 登录数据
   */
  loginByTel (data) {
    return request({
      url: '/login/cellphone',
      methods: 'GET',
      params: data
    })
  }
}

export default new Login()
