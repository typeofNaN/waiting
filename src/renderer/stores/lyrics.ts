import { action, observable, runInAction } from 'mobx'

import getLyric from 'api/lyrics'
import controller from './controller'

class Lyrics {
  @observable
  public loading = true

  @observable
  public list: { [propName: string]: any } = {}

  @action
  public getLyrics = async () => {
    this.loading = true

    const data = await getLyric(controller.song.id)
    runInAction(() => {
      this.list = data
      this.loading = false
    })
  }
}

export default new Lyrics()
