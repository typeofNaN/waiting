import { action, observable, runInAction } from 'mobx'

import { followUser, getArtist, unFollowUser } from 'api/artist'
import IAlbum from 'interface/IAlbum'
import IArtist from 'interface/IArtist'
import IArtistProfile from 'interface/IArtistProfile'
import IPlayList from 'interface/IPlayList'

class Artist {
  @observable
  public loading = true

  // Profile of the artist
  @observable
  public profile: IArtistProfile = {}

  // All albums of artist
  @observable
  public albums: IAlbum[] = []

  // Similar artists
  @observable
  public similar: IArtist[] = []

  // Contains 'id' and 'songs'
  @observable
  public playlist: IPlayList = {
    songs: []
  }

  @observable
  public desc = {
    briefDesc: ''
  }

  @action
  public getArtist = async (id: number) => {
    this.loading = true
    const data = await getArtist(id)
    runInAction(() => {
      if (data) {
        this.profile = data.profile
        this.playlist = data.playlist
        this.albums = data.albums
        this.similar = data.similar
        this.desc = data.desc
      }
      this.loading = false
    })
  }

  @action
  public follow = async (followed: boolean, id = this.profile.id) => {
    let data
    if (followed) {
      data = await unFollowUser(id)
    } else {
      data = await followUser(id)
    }

    if (data.success) {
      runInAction(() => {
        this.profile = Object.assign({}, this.profile, {
          followed: !followed
        })
      })
    }
    return data.success
  }
}

export default new Artist()
