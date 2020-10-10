import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './App'
import { StoreProvider } from './context'
import '@/utils/heartAnimate'

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('app')
)
