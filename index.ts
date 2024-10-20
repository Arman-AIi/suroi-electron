const { app, BrowserWindow, screen: electronScreen } = require('electron/main');
const net = require('net');

const createWindow = () => {
  const { width, height } = electronScreen.getPrimaryDisplay().workAreaSize;

  const win = new BrowserWindow({
    width: width,
    height: height,
    frame: false,
    backgroundColor: 'hsl(28, 100%, 50%)'
  });

  win.loadFile('client/loading.html');

  const checkServer = () => {
    const socket = new net.Socket();
    socket.once('error', (err) => {
      setTimeout(checkServer, 500); 
    });
    socket.once('connect', () => {
      socket.destroy();
      console.log('Server is ready!');
      win.reload();
      win.loadURL('http://localhost:3000');
    });
    socket.connect(3000, 'localhost');
  };

  checkServer();
};


app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});