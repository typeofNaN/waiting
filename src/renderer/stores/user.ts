import axios from 'axios'
import { action, observable, runInAction } from 'mobx'

import { getUserDetail } from 'api/user'
import IUserProfile from 'interface/IUserProfile'

class User {
  @observable
  public loading = true

  @observable
  public profile: IUserProfile = {}

  @observable
  public playlists: any = []

  @action
  public getUser = async (userid: number) => {
    this.loading = true

    const data = await getUserDetail(userid)
    runInAction(() => {
      this.profile = data.profile
      this.playlists = data.playlists
      this.loading = false
    })
  }

  //  TODO: use api
  @action
  public follow = async (followed: boolean) => {
    const data: any = await axios.get(
      followed ? `/api/user/unfollow/${this.profile.id}` : `/api/user/follow/${this.profile.id}`
    )

    if (data.success) {
      this.profile = Object.assign({}, this.profile, {
        followed: !followed
      })
    }
  }
}

export default new User()
