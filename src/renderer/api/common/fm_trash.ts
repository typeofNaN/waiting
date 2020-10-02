import { get } from 'utils/request'

interface FMTrash {
  id: number
  time?: number
}

export default (query: FMTrash) => {
  const path = '/fm/trash'
  const data = {
    id: query.id,
    time: query.time || 25
  }
  return get(path, data)
}
