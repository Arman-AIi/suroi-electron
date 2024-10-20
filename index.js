var _a = require('electron/main'), app = _a.app, BrowserWindow = _a.BrowserWindow, electronScreen = _a.screen;
var createWindow = function () {
    var _a = electronScreen.getPrimaryDisplay().workAreaSize, width = _a.width, height = _a.height;
    var win = new BrowserWindow({
        width: width,
        height: height,
        frame: false,
        backgroundColor: 'hsl(28, 100%, 50%)'
    });
    win.loadFile('client/loading.html');
    setTimeout(function () {
        win.reload();
        win.loadURL('http://localhost:3000');
    }, 20000);
};
app.whenReady().then(function () {
    createWindow();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
