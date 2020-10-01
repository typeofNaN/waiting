import { get } from 'utils/request'

interface ISimiSongQuery {
  id: number
  limit?: number
  offset?: number
}
// 相似歌曲
export default (query: ISimiSongQuery) => {
  const path = '/simi/song'
  const data = {
    id: query.id,
    limit: query.limit || 50,
    offset: query.offset || 0
  }
  return get(path, data)
}
