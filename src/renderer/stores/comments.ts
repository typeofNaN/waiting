import { action, observable, runInAction } from 'mobx'

import { getMusicComments } from 'api/comments'
import ISong from 'interface/ISong'

class Comments {
  @observable
  public loading = true

  @observable
  public hotList: any = []

  @observable
  public newestList: any = []

  @observable
  public total = 0

  @observable
  public song: ISong

  public nextOffset = 0

  @action
  public async getList(song: ISong) {
    if (!song) {
      return
    }
    this.loading = true
    const data = await getMusicComments(song.id)
    runInAction(() => {
      this.song = song
      this.hotList = data.hotList || []
      this.newestList = data.newestList || []
      this.total = data.total || 0
      this.nextOffset = data.nextOffset
      this.loading = false
    })
  }

  @action
  public like = async (id: number, liked: boolean) => {
    // const response = await axios.get(`/api/comments/like/${id}/${controller.song.id}/${+liked}`)
    // const { data } = response
    // const { hotList, newestList } = this
    // if (data.success === true) {
    //     const comment = [...hotList.slice(), ...newestList.slice()].find(e => e.commentId === id)
    //     comment.likedCount += liked ? 1 : -1
    //     comment.liked = liked
    // }
  }

  @action
  public loadMore = async (id: number) => {
    if (!this.nextOffset) {
      return
    }
    const data = await getMusicComments(id, this.nextOffset)
    runInAction(() => {
      this.newestList.push(...data.newestList)
      this.nextOffset = data.nextOffset
    })
  }
}

export default new Comments()
