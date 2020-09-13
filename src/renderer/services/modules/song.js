/**
 * @description 歌曲接口
 * @author typeofNaN
 * @time 2020-09-12
 */

import request from '@/utils/request'

class Song {
  /**
   * @description 根据歌曲ID获取歌曲信息
   * @author typeofNaN
   * @time 2020-09-12
   * @param { id } 歌曲id, 如果有多个，则用,分隔
   */
  getSongDetailById (id) {
    return request({
      url: '/song/detail',
      methods: 'GET',
      params: {
        ids: id
      }
    })
  }
}

export default new Song()
