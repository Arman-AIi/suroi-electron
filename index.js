var _a = require('electron/main'), app = _a.app, BrowserWindow = _a.BrowserWindow, electronScreen = _a.screen;
var net = require('net');
var createWindow = function () {
    var _a = electronScreen.getPrimaryDisplay().workAreaSize, width = _a.width, height = _a.height;
    var win = new BrowserWindow({
        width: width,
        height: height,
        frame: false,
        backgroundColor: 'hsl(28, 100%, 50%)'
    });
    win.loadFile('client/loading.html');
    var checkServer = function () {
        var socket = new net.Socket();
        socket.once('error', function (err) {
            // console.error('Server not ready yet:', err);
            setTimeout(checkServer, 500); // Check again in 500ms
        });
        socket.once('connect', function () {
            socket.destroy();
            console.log('Server is ready!');
            win.reload();
            win.loadURL('http://localhost:3000');
        });
        socket.connect(3000, 'localhost');
    };
    checkServer(); // Start checking immediately
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
