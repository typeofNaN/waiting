import { get } from 'utils/request'

interface ISimiPlaylistQuery {
  id: number
  limit?: number
  offset?: number
}
// 相似歌曲
export default (query: ISimiPlaylistQuery) => {
  const path = '/simi/playlist'
  const data = {
    id: query.id,
    limit: query.limit || 50,
    offset: query.offset || 0
  }
  return get(path, data)
}
