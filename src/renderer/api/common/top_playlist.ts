import { get } from 'utils/request'

interface ITopPlaylistQuery {
  cat: string
  order?: string
  limit?: number
  offset?: number
}
// 分类歌单
export default (query: ITopPlaylistQuery) => {
  const path = '/top/playlist'
  const data = {
    cat: query.cat || '全部',
    order: query.order || 'hot', // hot,new
    limit: query.limit || 50,
    offset: query.offset || 0,
    total: true
  }
  return get(path, data)
}
