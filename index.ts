const { app, BrowserWindow } = require('electron/main')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    frame: false,
    backgroundColor:'hsl(28, 100%, 50%)'
  })
  win.loadFile('client/loading.html')
  setTimeout(() => {
    win.reload();
    win.loadURL('http://localhost:3000')
  }, 20000);
}


app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
      
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})