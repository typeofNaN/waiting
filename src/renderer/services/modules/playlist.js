/**
 * @description 播放列表模块接口
 * @author typeofNaN
 * @time 2020-09-13
 */

import request from '@/utils/request'

class PlayList {
  /**
   * @description 获取播放列表详情
   * @author typeofNaN
   * @time 2020-09-13
   * @param { data } id
   */
  getPlaylistDetail (data) {
    return request({
      url: '/playlist/detail',
      methods: 'GET',
      params: data
    })
  }
}

export default new PlayList()
