import { action, observable, runInAction } from 'mobx'

import homeApi from 'api/home'
import helper from 'utils/helper'
import controller from './controller'
import me from './me'
import preferences from './preferences'

interface IHomeData {
  id?: number
  size: any
  pallet: any
  cover: string
}

class Home {
  @observable
  public loading = true

  @observable
  public list: IHomeData[] = []

  @action
  public async load() {
    let list: IHomeData[]
    if (me.hasLogin()) {
      list = await homeApi.getHomeData(me.profile.userId)
      const [favorite, recommend] = list

      me.rocking(favorite)

      if (favorite.size) {
        controller.setup(favorite)
      } else if (recommend.size) {
        controller.setup(recommend)
      } else {
        controller.setup(list[2])
      }
    } else {
      list = await homeApi.getHomeData()
      if (list.length === 0) {
        console.error('get home request failed')
        return
      }
      controller.setup(list[0])
    }

    if (preferences.autoPlay) {
      controller.play()
    } else {
      const [song] = controller.playlist.songs
      controller.song = song || { id: undefined, name: undefined }
    }

    list.forEach(e => {
      e.pallet = false
    })

    runInAction(() => {
      this.list = list
    })
    // Get the color pallets
    list.map(async (e, index: number) => {
      if (!e.cover) return

      const pallet = await helper.getPallet(`${e.cover.replace(/\?param=.*/, '')}?param=20y20`)
      e.pallet = pallet

      // Force update list
      this.updateShadow(e, index)
    })
  }

  @action
  public async getList() {
    this.loading = true
    // @ts-ignore
    this.getList = Function
    await this.load()
    runInAction(() => {
      this.loading = false
    })
  }

  @action
  public updateShadow = (e: IHomeData, index: number) => {
    this.list = [...this.list.slice(0, index), e, ...this.list.slice(index + 1, this.list.length)]
  }
}

export default new Home()
