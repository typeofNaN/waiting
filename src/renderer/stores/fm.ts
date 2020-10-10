import { action, observable, runInAction } from 'mobx'

import ISong from '@/interface/ISong'
import { getPlaylist, fmTrash } from 'api/fm'
import IPlayList from 'interface/IPlayList'
import controller from './controller'

class FM {
  @observable
  public loading = true

  @observable
  public song: ISong = {
    duration: 0
  }

  @observable
  public playlist: IPlayList = {
    songs: []
  }

  public preload = () => {
    controller.changeMode()
    this.shuffle()
    this.preload = Function
  }

  @action
  public async shuffle() {
    this.loading = true

    const data = await getPlaylist()
    runInAction(() => {
      this.playlist = data
      const [song] = this.playlist.songs
      this.song = song
      this.loading = false
    })
  }

  @action
  public play = () => {
    if (controller.playlist.id === this.playlist.id) {
      controller.toggle()
      return
    }

    controller.setup(this.playlist)
    controller.play()
  }

  // Ban a song
  @action
  public ban = async (id: number) => {
    const data = await fmTrash(id)
    if (data.code === 200) {
      this.next()
    }
  }

  @action
  public next = async () => {
    let index = this.playlist.songs.findIndex(e => e.id === controller.song.id)

    if (controller.playlist.id !== this.playlist.id) {
      this.play()
      return
    }

    if (++index < this.playlist.songs.length) {
      const next = this.playlist.songs[index]

      controller.play(next.id)
      return
    }

    // Refresh the playlist
    await this.shuffle()
    controller.setup(this.playlist)
    controller.play()
  }
}

export default new FM()
