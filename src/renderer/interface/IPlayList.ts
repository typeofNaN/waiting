import ISong from './ISong'

export default interface IPlayList {
  id?: number | string
  songs?: ISong[]
  name?: string
  link?: string
}
