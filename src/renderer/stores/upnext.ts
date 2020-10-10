import { action, observable } from 'mobx'

import ISong from 'interface/ISong'
import controller from './controller'

class UpNext {
  @observable
  public show = false

  @observable
  public song: ISong = {
    album: {},
    artists: []
  }

  // Save the canceled song
  public canceled: ISong = null

  @action
  public toggle(song: ISong, show = !this.show) {
    this.song = song
    this.show = show
  }

  @action
  public hide() {
    this.show = false
  }

  @action
  public cancel(song = controller.song) {
    this.canceled = song

    if (song) {
      this.show = false
    }
  }
}

export default  new UpNext()
