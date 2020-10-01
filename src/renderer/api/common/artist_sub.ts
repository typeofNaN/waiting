import { get } from 'utils/request'

interface IArtistSubQuery {
  id: number
  t: number
}

// 收藏与取消收藏歌手
export default (query: IArtistSubQuery) => {
  const path = '/artist/sub'
  const data = {
    id: query.id,
    artistIds: `[${query.id}]`
  }
  return get(path, data)
}
