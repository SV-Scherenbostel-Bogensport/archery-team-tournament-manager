import { join } from 'node:path'
import { is } from '@electron-toolkit/utils'
import { app, BrowserWindow } from 'electron'

function createWindow () {
  const mainWindow = new BrowserWindow({
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.ts'),
      sandbox: false,
    },
  })

  mainWindow.maximize()

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
}

app.whenReady().then(createWindow)
