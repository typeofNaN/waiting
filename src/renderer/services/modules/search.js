/**
 * @description 搜索接口
 * @author typeofNaN
 * @time 2020-09-13
 */

import request from '@/utils/request'

class Song {
  /**
   * @description 搜索
   * @author typeofNaN
   * @time 2020-09-13
   * @param { data } 搜索关键词
   */
  search (data) {
    return request({
      url: '/search',
      methods: 'GET',
      params: data
    })
  }
}

export default new Song()
