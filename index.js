var _a = require('electron/main'), app = _a.app, BrowserWindow = _a.BrowserWindow;
var createWindow = function () {
    var win = new BrowserWindow({
        width: 1900,
        height: 1080,
        frame: false,
        backgroundColor: 'hsl(113, 42%, 42%)'
    });
    win.loadFile('suroi.svg');
    win.loadURL('http://localhost:3000');
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
