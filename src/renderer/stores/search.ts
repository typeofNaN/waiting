import { action, observable, runInAction } from 'mobx'

import searchByType from 'api/search'
import IAlbum from 'interface/IAlbum'
import IArtist from 'interface/IArtist'

class Search {
  @observable
  public loading = false

  @observable
  public playlists: any = []

  @observable
  public albums: IAlbum[] = []

  @observable
  public artists: IArtist[] = []

  @observable
  public users: any = []

  public keyword = ''

  public nextPlaylistsOffset = 0

  public nextAlbumsOffset = 0

  public nextArtistsOffset = 0

  public nextUsersOffset = 0

  @action
  public getPlaylists = async (keyword: string) => {
    this.loading = true
    this.keyword = keyword
    const data = await searchByType('1000', keyword)
    runInAction(() => {
      this.playlists = data.playlists
      this.nextPlaylistsOffset = data.nextOffset
      this.loading = false
    })
  }

  @action
  public loadMorePlaylists = async () => {
    if (this.nextPlaylistsOffset === -1) {
      return
    }
    const data = await searchByType('1000', this.keyword, this.nextPlaylistsOffset)
    runInAction(() => {
      this.playlists.push(...data.playlists)
      this.nextPlaylistsOffset = data.nextOffset
    })
  }

  @action
  public getAlbums = async (keyword: string) => {
    this.loading = true
    const data = await searchByType('10', keyword)
    runInAction(() => {
      this.albums = data.albums
      this.nextAlbumsOffset = data.nextOffset
      this.loading = false
    })
  }

  @action
  public loadMoreAlbums = async () => {
    if (this.nextAlbumsOffset === -1) {
      return
    }
    const data = await searchByType('10', this.keyword, this.nextAlbumsOffset)
    runInAction(() => {
      this.albums.push(...data.albums)
      this.nextAlbumsOffset = data.nextOffset
    })
  }

  @action
  public getArtists = async (keyword: string) => {
    this.loading = true
    const data = await searchByType('100', keyword)
    runInAction(() => {
      this.artists = data.artists
      this.nextArtistsOffset = data.nextOffset
      this.loading = false
    })
  }

  @action
  public loadMoreArtists = async () => {
    if (this.nextArtistsOffset === -1) {
      return
    }
    const data = await searchByType('100', this.keyword, this.nextArtistsOffset)
    this.artists.push(...data.artists)
    this.nextArtistsOffset = data.nextOffset
  }

  @action
  public getUsers = async (keyword: string) => {
    this.loading = true
    const data = await searchByType('1002', keyword)
    runInAction(() => {
      this.users = data.users
      this.nextUsersOffset = data.nextOffset
      this.loading = false
    })
  }

  @action
  public loadMoreUsers = async () => {
    if (this.nextUsersOffset === -1) {
      return
    }
    const data = await searchByType('1002', this.keyword, this.nextUsersOffset)
    this.users.push(...data.users)
    this.nextUsersOffset = data.nextOffset
  }
}

export default new Search()
