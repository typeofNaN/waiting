/**
 * @description 状态管理，处理用户认证
 * @author typeofNaN
 * @time 2020-09-17
 */

import local from '@/utils/local'
import loginApi from '@/services/modules/login'

const state = {
  isLogin: local.get('profile'),
  account: local.get('account'),
  bindings: local.get('bindings'),
  profile: local.get('profile')
}

const getters = {
  getUserIsLogin: state => {
    if (state.isLogin) {
      return true
    } else {
      return false
    }
  },
  getUserAccount: state => state.account,
  getUserBindings: state => state.bindings,
  getUserProfile: state => state.profile
}

const mutations = {
  SET_USER_DATA (state, data) {
    Object.keys(data).forEach(function (key) {
      state[key] = data[key]
    })
  }
}

const actions = {
  /**
   * @description 用户登录
   * @author typeofNaN
   * @time 2020-09-17
   */
  async login ({ commit }, payload) {
    const { account, password } = payload.signInData

    let postData = {}
    let res = {}

    if (account.indexOf('@') >= 0) {
      postData = {
        email: account,
        password
      }

      res = await loginApi.loginByEmail(postData)
    } else {
      postData = {
        phone: account,
        password
      }

      res = await loginApi.loginByTel(postData)
    }

    console.log(res)

    if (res.code === 200) {
      console.log(res)
    }

    // let data = {
    //   isLogin: true,
    //   account: res.account,
    //   bindings: res.bindings,
    //   profile: res.profile
    // }

    // local.set('account', res.account)
    // local.set('bindings', res.bindings)
    // local.set('profile', res.profile)
    // commit('SET_USER_DATA', data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
