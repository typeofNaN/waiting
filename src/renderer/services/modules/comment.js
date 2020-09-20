/**
 * @description 评论模块接口
 * @author typeofNaN
 * @time 2020-09-20
 */

import request from '@/utils/request'

class Comment {
  /**
   * @description 获取热门评论
   * @author typeofNaN
   * @time 2020-09-20
   * @param { data } data
   */
  getHotComment (data) {
    return request({
      url: '/comment/hot',
      methods: 'GET',
      params: data
    })
  }

  /**
   * @description 获取歌曲评论
   * @author typeofNaN
   * @time 2020-09-20
   * @param { data } data
   */
  getMusicComment (data) {
    return request({
      url: '/comment/music',
      methods: 'GET',
      params: data
    })
  }
}

export default new Comment()
