import { get } from 'utils/request'

interface ILikeQuery {
  id: number
  alg?: string
  like: boolean
  time?: number
}
// 红心与取消红心歌曲
export default (query: ILikeQuery) => {
  const path = '/like'
  const data = {
    id: query.id,
    like: query.like,
    alg: query.alg,
    time: query.time
  }
  return get(path, data)
}
