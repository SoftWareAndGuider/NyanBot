const { app, BrowserWindow, ipcMain } = require('electron')
const diaflow = require('./module/dialogHandler')
let mainWindow

app.on('ready', () => {
  if (!mainWindow) createMainWindow()
})

app.on('activate', () => {
  if (!mainWindow) createMainWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

function createMainWindow () {
  mainWindow = new BrowserWindow({ webPreferences: { nodeIntegration: true }, autoHideMenuBar: true, fullscreen: true })
    .on('close', () => { mainWindow = null })
  mainWindow.loadFile(require('path').resolve() + '/src/index.html')
}

ipcMain.on('send', (event, arg) => {
  diaflow.send(arg[0], arg[1], (data) => {
    event.sender.send('response', data)
  })
})
