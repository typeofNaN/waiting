import { action, observable, runInAction } from 'mobx'

import { getTopList } from 'api/top'

class Top {
  @observable
  public loading = true

  @observable
  public list: any = []

  @action
  public getList = async () => {
    this.loading = true
    const list = await getTopList()
    runInAction(() => {
      this.list = list
      this.loading = false
    })
  }
}

export default new Top()
