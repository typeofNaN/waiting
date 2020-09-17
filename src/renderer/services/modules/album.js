/**
 * @description 专辑模块接口
 * @author typeofNaN
 * @time 2020-09-17
 */

import request from '@/utils/request'

class Album {
  /**
   * @description 获取专辑详情
   * @author typeofNaN
   * @time 2020-09-17
   * @param { data } id
   */
  getAlbumDetail (data) {
    return request({
      url: '/album',
      methods: 'GET',
      params: data
    })
  }
}

export default new Album()
