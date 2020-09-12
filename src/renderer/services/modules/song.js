import request from '@/utils/request'

class Song {
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
