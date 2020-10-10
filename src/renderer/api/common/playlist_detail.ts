import { get } from 'utils/request'
interface IPlaylistDetailQuery {
  id: number
  s?: number
}
// 歌单详情
export default (query: IPlaylistDetailQuery) => {
  const path = '/playlist/detail'
  const data = {
    id: query.id,
    s: query.s || 8
  }
  return get(path, data)
}
