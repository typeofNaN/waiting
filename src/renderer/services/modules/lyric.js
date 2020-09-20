/**
 * @description 歌词模块接口
 * @author typeofNaN
 * @time 2020-09-20
 */

import request from '@/utils/request'

class Lyric {
  /**
   * @description 获取歌曲歌词
   * @author typeofNaN
   * @time 2020-09-20
   * @param { id } id
   */
  getSongLyric (id) {
    return request({
      url: '/lyric',
      methods: 'GET',
      params: {
        id
      }
    })
  }
}

export default new Lyric()
