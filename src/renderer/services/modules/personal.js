/**
 * @description 私人播放列表接口
 * @author typeofNaN
 * @time 2020-09-12
 */

import request from '@/utils/request'

class Personal {
  /**
   * @description 获取私人播放列表
   * @author typeofNaN
   * @time 2020-09-12
   */
  getPersonalizedPlayList () {
    return request({
      url: '/personalized',
      methods: 'GET'
    })
  }

  /**
   * @description 获取私人播放列表top10
   * @author typeofNaN
   * @time 2020-09-12
   */
  getPersonalizedPlayListTop10 () {
    return request({
      url: '/personalized?limit=10',
      methods: 'GET'
    })
  }
}

export default new Personal()
