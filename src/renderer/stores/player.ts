import { action, observable, runInAction } from 'mobx'
import * as pinyin from 'tiny-pinyin'

import { getPlayListDetail, getRecommend } from 'api/player'
import ISong from 'interface/ISong'
import helper from 'utils/helper'
import IArtist from 'interface/IArtist'

class Player {
  @observable
  public loading = true

  @observable
  public songs: ISong[] = []

  @observable
  public filtered: ISong[] = []

  @observable
  public meta: any = {
    pallet: [[0, 0, 0]],
    author: []
  }

  // Show filter
  @observable
  public searching = false

  @observable
  public keywords: string

  // Recommend albums and playlist
  @observable
  public recommend: any = []

  // Recent user
  @observable
  public users: any = []

  // Similar artist
  @observable
  public artists: IArtist[] = []

  public timer: number

  @action
  public getDetail = async (type: string, id: number) => {
    const detail = await getPlayListDetail(type, id)
    if (detail && detail.meta) {
      const pallet = await helper.getPallet(detail.meta.cover)
      detail.meta.pallet = pallet
      runInAction(() => {
        this.meta = detail.meta
        // @ts-ignore
        this.songs.replace(detail.songs)
      })
    }
  }

  @action
  public getRelated = async (song: ISong) => {
    if (!song.id || song.artists.length === 0) {
      return
    }
    const data = await getRecommend(song.id, song.artists[0].id)
    if (data) {
      runInAction(() => {
        this.recommend = data.playlists
        this.users = data.users
        this.artists = data.artists
      })
    }
  }

  @action
  public subscribe = async (subscribed: boolean) => {
    const { meta }: any = this
    // const response = await axios.get(
    //     subscribed ? `/api/player/subscribe/${meta.id}` : `/api/player/unsubscribe/${meta.id}`
    // )
    // const { data } = response

    // if (data.success) {
    //     this.meta.subscribed = subscribed
    // }
  }

  @action
  public toggleLoading(show = !this.loading) {
    this.loading = show
  }

  @action
  public toggleSearch(show = !this.searching) {
    this.searching = show
  }

  @action
  public doFilter(text: string) {
    let songs = []

    // Convert text to chinese pinyin
    text = pinyin.convertToPinyin(text.trim())

    songs = this.songs.filter(e => {
      return (
        // Fuzzy match the song name
        pinyin.convertToPinyin(e.name).indexOf(text) > -1 ||
        // Fuzzy match the album name
        pinyin.convertToPinyin(e.album.name).indexOf(text) > -1 ||
        e.artists.findIndex(d => pinyin.convertToPinyin(d.name).indexOf(text) > -1) !== -1
      )
    })

    this.keywords = text
    this.filtered = songs
  }

  public filter = (text = '') => {
    clearTimeout(this.timer)
    this.timer = window.setTimeout(() => this.doFilter(text), 50)
  }
}

export default new Player()
