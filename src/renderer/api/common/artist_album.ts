import { get } from 'utils/request'

interface IArtistAlbumQuery {
  id: number
  limit?: number
  offset?: number
}
// 歌手专辑列表
export default (query: IArtistAlbumQuery) => {
  const path = '/artist/albums'
  const data = {
    id: query.id,
    limit: query.limit || 30,
    offset: query.offset || 0,
    total: true
  }
  return get(path, data)
}
