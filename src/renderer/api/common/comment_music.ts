import { get } from 'utils/request'

interface ICommentMusicQuery {
  id: number
  limit?: number
  offset?: number
  before?: number
}

export default (query: ICommentMusicQuery) => {
  const path = '/comment/music'
  const data = {
    id: query.id,
    limit: query.limit || 20,
    offset: query.offset || 0,
    beforeTime: query.before || 0
  }
  return get(path, data)
}
