import { useStore } from '@/context'
import { Button, IconButton } from '@material-ui/core'
import { FavoriteBorder, Favorite, Share } from '@material-ui/icons'
import classnames from 'classnames'
import Indicator from 'components/Indicator'
import ProgressImage from 'components/ProgressImage'
import IArtist from 'interface/IArtist'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { Link } from 'react-router-dom'
import helper from 'utils/helper'
import AdapterLink from '../AdapterLink'
import * as styles from './index.less'

interface IHeroProps {
  location?: any
}

const Hero: React.SFC<IHeroProps> = observer(props => {
  const { location } = props
  const { me, comments, controller, share } = useStore()
  const { isLiked, unlike, like } = me
  const { total: commentsTotal } = comments
  const { song } = controller
  const { pathname } = location
  const liked = isLiked(song.id)

  return (
    <div className={ styles.container }>
      <ProgressImage
        { ...{
          height: window.innerHeight,
          width: window.innerHeight,
          src: song.album.cover.replace(/100y100$/, '500y500')
        } }
      />

      <Button
        className={ styles.share }
        component={ AdapterLink }
        to=""
        onClick={ (e: any) => {
          e.preventDefault()
          share.toggle(true)
        } }
      >
        <Share />
      </Button>

      <summary>
        <IconButton onClick={ () => (liked ? unlike(song) : like(song)) }>
          {
            liked
              ? <Favorite className={ styles.liked } />
              : <FavoriteBorder />
          }
        </IconButton>

        <span className={ styles.badge }>{ helper.getRate(song) }</span>

        <span className={ styles.badge }>
          {
            pathname === '/comments'
              ? `${helper.humanNumber(commentsTotal)} 条评论`
              : '歌词'
          }
        </span>
      </summary>

      <nav>
        <article
          className={ classnames({
            [styles.active]: pathname === '/lyrics'
          }) }
        >
          <Link to={ `/${pathname === '/comments' ? 'lyrics' : 'comments'}` }>
            {
              pathname === '/comments'
                ? '歌词'
                : `${helper.humanNumber(commentsTotal)} 条评论`
            }
          </Link>
        </article>

        <article>
          <Link to="/singleton">
            Cover
            <Indicator
              style={ {
                marginLeft: 28
              } }
            />
          </Link>
        </article>
      </nav>

      <footer>
        <h3>{ song.name }</h3>

        <p className={ styles.author }>
          { song.artists.map((e: IArtist, index: number) => {
            // Show the artist
            return (
              <Link
                key={ index }
                to={ e.link }
              >{ e.name }</Link>
            )
          }) }
        </p>
      </footer>
    </div>
  )
})

export default Hero
