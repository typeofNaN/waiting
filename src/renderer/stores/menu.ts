import { observable, action } from 'mobx'

class Menu {
  @observable
  public show = false

  @action
  public toggle = (show = !this.show) => {
    this.show = show
  }
}

export default new Menu()
