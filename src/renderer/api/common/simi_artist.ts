import { get } from 'utils/request'

interface ISimiArtistQuery {
  id: number
}
// 相似歌手
export default (query: ISimiArtistQuery) => {
  const path = '/simi/artist'
  const data = {
    id: query.id
  }
  return get(path, data)
}
