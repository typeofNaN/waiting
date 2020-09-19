/**
 * @description 状态管理，app设置
 * @author typeofNaN
 * @time 2020-09-19
 */

const state = {
  loading: false
}

const getters = {
  getLoading: state => state.loading
}

const mutations = {
  SET_LOADING (state, bool) {
    state.loading = bool
  }
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
