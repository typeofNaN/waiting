import { get } from 'utils/request'

interface IAlbumQuery {
  id: number
}

export default (query: IAlbumQuery) => {
  return get('/album', { id: query.id })
}
