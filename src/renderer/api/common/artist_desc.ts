import { get } from 'utils/request'

interface IArtistDescQuery {
  id: number
}
// 歌手介绍
export default (query: IArtistDescQuery) => {
  const path = `/artist/desc`
  const data = {
    id: query.id
  }
  return get(path, data)
}
