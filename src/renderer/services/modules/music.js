/**
 * @description 歌曲接口
 * @author typeofNaN
 * @time 2020-09-13
 */

import request from '@/utils/request'

class Music {
  /**
   * @description 根据歌曲ID获取歌曲url
   * @author typeofNaN
   * @time 2020-09-12
   * @param { id } 歌曲id
   */
  getMusicUrl (id) {
    return request({
      url: '/music/url',
      methods: 'GET',
      params: {
        id: id,
        br: 999000
      }
    })
  }
}

export default new Music()
