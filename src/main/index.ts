// import { app, BrowserWindow, Menu, session, shell } from 'electron'
// import installer, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer'
// import * as windowStateKeeper from 'electron-window-state'
// import * as agent from 'random-useragent'
// import * as url from 'url'
// import ipcMainSets from './ipcMainSets'
// import routes from './routers'

// const _PLATFORM = process.platform
// const isOsx = _PLATFORM === 'darwin'
// // const isLinux = _PLATFORM === 'linux'
// const showMenuBarOnLinux = false
// let win: BrowserWindow
// let menu

// const installExtensions = async () => {
//   const extensions = [REACT_DEVELOPER_TOOLS]

//   return Promise.all(extensions.map(name => installer(name, false)))
// }

// const mainMenu = [
//   {
//     label: 'ieaseMusic',
//     submenu: [
//       {
//         label: `About ieaseMusic`,
//         selector: 'orderFrontStandardAboutPanel:'
//       },
//       {
//         label: 'Preferences...',
//         accelerator: 'Cmd+,',
//         click() {
//           win.webContents.send('show-preferences')
//         }
//       },
//       {
//         type: 'separator'
//       },
//       {
//         role: 'hide'
//       },
//       {
//         role: 'hideothers'
//       },
//       {
//         role: 'unhide'
//       },
//       {
//         type: 'separator'
//       },
//       {
//         label: 'Check for updates',
//         accelerator: 'Cmd+U',
//         click() {
//           // updater.checkForUpdates()
//         }
//       },
//       {
//         label: 'Quit',
//         accelerator: 'Command+Q',
//         selector: 'terminate:',
//         click() {
//           // goodbye()
//         }
//       }
//     ]
//   },
//   {
//     label: 'Controls',
//     submenu: [
//       {
//         label: 'Pause',
//         accelerator: 'Space',
//         click() {
//           win.show()
//           win.webContents.send('player-toggle')
//         }
//       },
//       {
//         label: 'Next',
//         accelerator: 'Right',
//         click() {
//           win.show()
//           win.webContents.send('player-next')
//         }
//       },
//       {
//         label: 'Previous',
//         accelerator: 'Left',
//         click() {
//           win.show()
//           win.webContents.send('player-previous')
//         }
//       },
//       {
//         label: 'Increase Volume',
//         accelerator: 'Up',
//         click() {
//           win.show()
//           win.webContents.send('player-volume-up')
//         }
//       },
//       {
//         label: 'Decrease Volume',
//         accelerator: 'Down',
//         click() {
//           win.show()
//           win.webContents.send('player-volume-down')
//         }
//       },
//       {
//         label: 'Like',
//         accelerator: 'Cmd+L',
//         click() {
//           win.show()
//           win.webContents.send('player-like')
//         }
//       }
//     ]
//   },
//   {
//     label: 'Recently Played',
//     submenu: [
//       {
//         label: 'Nothing...'
//       }
//     ]
//   },
//   {
//     label: 'Next Up',
//     submenu: [
//       {
//         label: 'Nothing...'
//       }
//     ]
//   },
//   {
//     label: 'Edit',
//     submenu: [
//       {
//         role: 'undo'
//       },
//       {
//         role: 'redo'
//       },
//       {
//         type: 'separator'
//       },
//       {
//         role: 'cut'
//       },
//       {
//         role: 'copy'
//       },
//       {
//         role: 'paste'
//       },
//       {
//         role: 'pasteandmatchstyle'
//       },
//       {
//         role: 'delete'
//       },
//       {
//         role: 'selectall'
//       }
//     ]
//   },
//   {
//     label: 'View',
//     submenu: [
//       {
//         label: 'Home',
//         accelerator: 'Cmd+Shift+H',
//         click() {
//           win.webContents.send('show-home')
//         }
//       },
//       {
//         label: 'Search',
//         accelerator: 'Cmd+F',
//         click() {
//           win.webContents.send('show-search')
//         }
//       },
//       {
//         label: 'Top podcasts',
//         accelerator: 'Cmd+Shift+T',
//         click() {
//           win.webContents.send('show-top')
//         }
//       },
//       {
//         label: 'Playlist',
//         accelerator: 'Cmd+Shift+P',
//         click() {
//           win.webContents.send('show-playlist')
//         }
//       },
//       {
//         label: 'Made For You',
//         accelerator: 'Cmd+Shift+F',
//         click() {
//           win.webContents.send('show-fm')
//         }
//       },
//       {
//         label: 'Downloads',
//         accelerator: 'Cmd+Shift+D',
//         click() {
//           // downloader.showDownloader()
//         }
//       },
//       {
//         type: 'separator'
//       },
//       {
//         label: 'Menu',
//         accelerator: 'Cmd+Shift+L',
//         click() {
//           win.webContents.send('show-menu')
//         }
//       },
//       {
//         label: 'Next Up',
//         accelerator: 'Cmd+P',
//         click() {
//           win.webContents.send('show-playing')
//         }
//       },
//       {
//         type: 'separator'
//       },
//       {
//         role: 'toggledevtools'
//       }
//     ]
//   },
//   {
//     role: 'window',
//     submenu: [
//       {
//         role: 'minimize'
//       },
//       {
//         role: 'close'
//       }
//     ]
//   }
// ]

// function updateMenu(playing = false) {
//   if (!isOsx && !showMenuBarOnLinux) {
//     return
//   }
//   // @ts-ignore
//   mainMenu[1]['submenu'][0]['label'] = playing ? 'Pause' : 'Play'
//   // @ts-ignore
//   menu = Menu.buildFromTemplate(mainMenu)
//   Menu.setApplicationMenu(menu)
// }

// const express = require('express')
// const apicache = require('apicache')
// const path = require('path')
// // const fs = require('fs')
// let cache = apicache.middleware

// const createWindow = async () => {
//   const appApi = express()

//   // 跨域设置
//   appApi.all('*', function (req: any, res: any, next: Function) {
//     if (req.path !== '/' && !req.path.includes('.')) {
//       res.header('Access-Control-Allow-Credentials', 'true')
//       // 这里获取 origin 请求头 而不是用 *
//       res.header('Access-Control-Allow-Origin', req.headers['origin'] || '*')
//       res.header('Access-Control-Allow-Headers', 'X-Requested-With')
//       res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
//       res.header('Content-Type', 'application/jsoncharset=utf-8')
//     }
//     next()
//   })
//   const onlyStatus200 = (req: any, res: any) => res.statusCode === 200

//   appApi.use(cache('2 minutes', onlyStatus200))

//   appApi.use(express.static(path.resolve(__dirname, 'public')))

//   appApi.use(function (req: any, res: any, next: Function) {
//     const proxy = req.query.proxy
//     if (proxy) {
//       req.headers.cookie = req.headers.cookie + `__proxy__${proxy}`
//     }
//     next()
//   })

//   appApi.use('/', routes)
//   const port = 5001
//   appApi.listen(port, () => {
//     console.log(`server running @ http://localhost:${port}`)
//   })
//   const mainWindowState = windowStateKeeper({
//     defaultWidth: 800,
//     defaultHeight: 520
//   })

//   win = new BrowserWindow({
//     x: mainWindowState.x,
//     y: mainWindowState.y,
//     show: false,
//     width: 800,
//     height: 520,
//     backgroundColor: 'none',
//     titleBarStyle: 'hiddenInset',
//     webPreferences: {
//       // webSecurity: false,
//       nodeIntegration: true
//     }
//   })

//   updateMenu()
//   mainWindowState.manage(win)
//   ipcMainSets(win)

//   if (process.env.NODE_ENV !== 'production') {
//     win.loadURL('http://localhost:9080')
//   } else {
//     win.loadURL(
//       url.format({
//         pathname: path.join(__dirname, 'index.html'),
//         protocol: 'file:',
//         slashes: true
//       })
//     )
//   }

//   win.on('closed', () => {
//     win = null
//   })

//   win.webContents.on('did-finish-load', () => {
//     try {
//       win.show()
//       win.focus()
//     } catch (ex) { }
//   })
//   // // cors
//   // const ieaseUri = 'https://music.163.com'
//   // win.webContents.session.webRequest.onBeforeSendHeaders(
//   //   {
//   //     urls: [`${ieaseUri}/*`]
//   //   },
//   //   async (details, callback) => {
//   //     const cookie: any = await session.defaultSession.cookies.get({ url: ieaseUri })
//   //     callback({
//   //       requestHeaders: {
//   //         ...details.requestHeaders,
//   //         Connection: 'keep-alive',
//   //         Referer: ieaseUri,
//   //         cookie,
//   //         Origin: ieaseUri,
//   //         Host: 'music.163.com',
//   //         'User-Agent': agent.getRandom()
//   //       }
//   //     })
//   //   }
//   // )
//   // open devTools
//   if (process.env.NODE_ENV !== 'production') {
//     win.webContents.on('did-frame-finish-load', () => {
//       win.webContents.once('devtools-opened', () => {
//         win.focus()
//       })
//       win.webContents.openDevTools()
//     })
//     await installExtensions()
//   }
// }

// app.on('ready', createWindow)

// app.on('window-all-closed', () => {
//   app.quit()
// })

// app.on('activate', () => {
//   if (win === null) {
//     createWindow()
//   }
// })

import { app, BrowserWindow, ipcMain } from 'electron'
import * as windowStateKeeper from 'electron-window-state'

import routes from './routers'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  (global as any).__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\')
}

let mainWindow: any
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

// const express = require('/app.js')

const express = require('express')
const apicache = require('apicache')
const path = require('path')
// const fs = require('fs')
let cache = apicache.middleware

function createWindow () {
  const app = express()

  // 跨域设置
  app.all('*', function (req: any, res: any, next: Function) {
    if (req.path !== '/' && !req.path.includes('.')) {
      res.header('Access-Control-Allow-Credentials', 'true')
      // 这里获取 origin 请求头 而不是用 *
      res.header('Access-Control-Allow-Origin', req.headers['origin'] || '*')
      res.header('Access-Control-Allow-Headers', 'X-Requested-With')
      res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
      res.header('Content-Type', 'application/json;charset=utf-8')
    }
    next()
  })
  const onlyStatus200 = (req: any, res: any) => res.statusCode === 200

  app.use(cache('2 minutes', onlyStatus200))

  app.use(express.static(path.resolve(__dirname, 'public')))

  app.use(function (req: any, res: any, next: Function) {
    const proxy = req.query.proxy
    if (proxy) {
      req.headers.cookie = req.headers.cookie + `__proxy__${proxy}`
    }
    next()
  })

  app.use('/', routes)
  const port = 5001
  app.listen(port, () => {
    console.log(`server running @ http://localhost:${port}`)
  })
  // express()
  /**
   * Initial window options
   */
  // mainWindow = new BrowserWindow({
  //   height: 520,
  //   useContentSize: true,
  //   width: 800,
  //   frame: false,
  //   resizable: false,
  //   skipTaskbar: false,
  //   transparent: false,
  //   title: '网愈云音乐',
  //   autoHideMenuBar: true,
  //   x: 0,
  //   y: 0,
  //   webPreferences: {
  //     nodeIntegration: true
  //   }
  // })

  const mainWindowState = windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 520
  })

  mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    show: false,
    width: 800,
    height: 520,
    backgroundColor: 'none',
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.webContents.on('did-finish-load', () => {
    try {
      mainWindow.show()
      mainWindow.focus()
    } catch (ex) { }
  })

  // open devTools
  if (process.env.NODE_ENV !== 'production') {
    mainWindow.webContents.on('did-frame-finish-load', () => {
      mainWindow.webContents.once('devtools-opened', () => {
        mainWindow.focus()
      })
      mainWindow.webContents.openDevTools()
    })
    // await installExtensions()
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('close', () => {
  mainWindow.close()
})
ipcMain.on('minimize', () => {
  mainWindow.minimize()
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'
autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})
app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
