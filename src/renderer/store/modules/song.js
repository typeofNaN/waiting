import songApi from '@/services/modules/song'

const state = {
  currentSong: {}
}

const getters = {
  getCurrentSong: state => state.currentSong
}

const mutations = {
  SET_CURRENT_SONG (state, song) {
    state.currentSong = song
  }
}

const actions = {
  async setCurrentSong ({ commit }) {
    const res = await songApi.getSongDetailById(450612833)
    if (res.code === 200) {
      commit('SET_CURRENT_SONG', res.songs[0])
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
