import request from '@/utils/request'

class Personal {
  getPersonalizedPlayList () {
    return request({
      url: '/personalized',
      methods: 'GET'
    })
  }

  getPersonalizedPlayListTop10 () {
    return request({
      url: '/personalized?limit=10',
      methods: 'GET'
    })
  }
}

export default new Personal()
