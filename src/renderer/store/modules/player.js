import musicApi from '@/services/modules/music'
import playListApi from '@/services/modules/playList'
import songApi from '@/services/modules/song'

const state = {
  playerList: [],
  playerSong: {},
  playerMusicUrls: [],
  playerIsPlay: false,
  playerCurrentTime: 0
}

const getters = {
  getPlayerList: state => state.playerList,
  getPlayerSong: state => state.playerSong,
  getPlayerMusicUrls: state => state.playerMusicUrls,
  getPlayerIsPlay: state => state.playerIsPlay,
  getPlayerCurrentTime: state => state.playerCurrentTime
}

const mutations = {
  SET_PLAYER_LIST (state, data) {
    state.playerList = data
  },
  SET_PLAYER_DATA (state, data) {
    Object.keys(data).forEach(function (key) {
      state[key] = data[key]
    })
  }
}

const actions = {
  /**
   * @description 获取播放音乐
   * @author typeofNaN
   * @time 2020-09-13
   */
  async playMusic ({ commit }, id) {
    commit('SET_PLAYER_DATA', {
      playerIsPlay: false,
      playerCurrentTime: 0
    })
    const songRes = await songApi.getSongDetailById(id)
    commit('SET_PLAYER_DATA', {
      playerSong: songRes.songs[0]
    })

    const musicRes = await musicApi.getMusicUrl(id)
    commit('SET_PLAYER_DATA', {
      playerMusicUrls: musicRes.data,
      playerIsPlay: true
    })
  },
  /**
   * @description 获取播放音乐列表
   * @author typeofNaN
   * @time 2020-09-13
   */
  async playerlist ({ commit, dispatch }, id) {
    const playListRes = await playListApi.getPlaylistDetail(id)
    commit('SET_PLAYER_LIST', playListRes.playlist.tracks)
    dispatch('playMusic', playListRes.playlist.tracks[0].id)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
