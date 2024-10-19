var _a = require('electron/main'), app = _a.app, BrowserWindow = _a.BrowserWindow;
var createWindow = function () {
    var win = new BrowserWindow({
        width: 1920,
        height: 1080,
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
