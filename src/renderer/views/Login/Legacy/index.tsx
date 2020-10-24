import AdapterLink from '@/components/AdapterLink'
import { useStore } from '@/context'
import { Button, CircularProgress, Typography } from '@material-ui/core'
import { ArrowBackSharp } from '@material-ui/icons'
import classnames from 'classnames'
import { observer } from 'mobx-react-lite'
import Header from 'components/Header'
import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import * as styles from './index.less'

interface MatchParams {
  fm: string
}

interface ILegacyProps extends RouteComponentProps<MatchParams> { }

const Legacy: React.FC<ILegacyProps> = observer(props => {
  const {
    me: { login, logining }
  } = useStore()
  const phoneRef = React.useRef<HTMLInputElement>()
  const passwordRef = React.useRef<HTMLInputElement>()
  const [showError, setShowError] = React.useState(false)

  const doLogin = async () => {
    const phone = phoneRef.current.value
    const password = passwordRef.current.value

    // Test phone and password not empty
    if (!phone.trim() || !password.trim()) {
      setShowError(true)
      return
    }
    setShowError(false)

    const { history, match } = props

    if (await login(phone, password)) {
      // Login success
      history.replace(+match.params.fm ? '/fm' : '/')
      return
    }
    setShowError(true)
  }

  const handleEnter = async (e: any) => {
    if (e.charCode !== 13) {
      return
    }
    doLogin()
  }

  const { match } = props
  return (
    <div className={ styles.container }>
      <Header
        {  ...{
          transparent: true,
          showBack: true
        } }
      />
      {/* <Button
        className={ styles.back }
        component={ AdapterLink }
        to="/"
      >
        <ArrowBackSharp />
        听音乐，享心情~
      </Button> */}

      <header>
        <h1>Sign in</h1>
        <p>开启您的专属私人音乐~</p>
      </header>
      <section className={styles.inputsec}>
        <input
          ref={ phoneRef }
          type="text"
          placeholder="账号"
        />
        <input
          onKeyPress={ handleEnter }
          placeholder="密码"
          ref={ passwordRef }
          type="password"
        />
        <p
          className={ classnames(styles.error, {
            [styles.show]: showError
          }) }
        >账号密码错误，请重新输入</p>
      </section>

      <footer>
        <Button
          variant="contained"
          disabled={ logining }
          color="primary"
          onClick={ doLogin }
        >
          {
            logining
              ? (
                  <>
                    <CircularProgress size={14} />
                    <Typography>Logining...</Typography>
                  </>
                )
              : '登 录'
          }
        </Button>
      </footer>
      <p className={ styles.copyright }>&copy; typeofNaN, { new Date().getFullYear() }. 由 Electron 和 日月星辰 强力驱动 | 吾之臂躯 行针步线</p>
    </div>
  )
})

export default Legacy
