import { get } from 'utils/request'

interface ILyricQuery {
  id: number
}
// 歌词
export default (query: ILyricQuery) => {
  const path = '/lyric'
  const data = {
    id: query.id
  }
  return get(path, data)
}
