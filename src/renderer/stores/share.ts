import { action, observable } from 'mobx'

class Share {
  @observable
  public show = false

  @action
  public toggle = (show = !this.show) => {
    this.show = show
  }
}

export default new Share()
