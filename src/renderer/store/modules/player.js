import musicApi from '@/services/modules/music'
import playListApi from '@/services/modules/playList'
import songApi from '@/services/modules/song'

const state = {
  list: [],
  song: {},
  music_urls: [],
  is_play: false,
  currentTime: 0
}

const getters = {
  getPlayerList: state => state.list,
  getPlayerSong: state => state.song,
  getPlayerMusicUrls: state => state.music_urls,
  getPlayerIsPlay: state => state.is_play,
  getPlayerCurrentTime: state => state.currentTime
}

const mutations = {
  SET_PLAYER_LIST (state, data) {
    state.list = data
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
      is_play: false,
      currentTime: 0
    })
    const songRes = await songApi.getSongDetailById(id)
    commit('SET_PLAYER_DATA', {
      song: songRes.songs[0]
    })

    const musicRes = await musicApi.getMusicUrl(id)
    commit('SET_PLAYER_DATA', {
      music_urls: musicRes.data,
      is_play: true
    })
  },
  /**
   * @description 获取播放音乐列表
   * @author typeofNaN
   * @time 2020-09-13
   */
  async playPlaylist ({ commit, dispatch }, id) {
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
