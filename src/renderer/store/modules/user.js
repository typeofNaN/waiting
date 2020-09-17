import local from '@/utils/local'

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
  login ({ commit }, res) {
    let data = {
      isLogin: true,
      account: res.account,
      bindings: res.bindings,
      profile: res.profile
    }

    local.set('account', res.account)
    local.set('bindings', res.bindings)
    local.set('profile', res.profile)
    commit('SET_USER_DATA', data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
