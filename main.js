const electron = require('electron');
const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;


app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 500,
        frame: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: __dirname + '/preload.js',
        }
    });
    mainWindow.loadURL('file://' + __dirname + '/main.html');

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});

ipcMain.on('quit', (e, arg) => {
    app.quit();
});

ipcMain.on('mini', (e, arg) => {
    mainWindow.minimize();
});

ipcMain.on('resize', (e, arg) => {
    mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
});
