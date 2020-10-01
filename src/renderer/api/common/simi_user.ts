import { get } from 'utils/request'

interface ISimiUserQuery {
  id: number
  limit?: number
  offset?: number
}
// 相似用户
export default (query: ISimiUserQuery) => {
  const path = '/simi/user'
  const data = {
    id: query.id,
    limit: query.limit || 50,
    offset: query.offset || 0
  }
  return get(path, data)
}
