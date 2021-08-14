const electron = require('electron');
const Store = require('electron-store');
const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

const store = new Store();

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {
    var width = store.get('width') || 800;
    var height = store.get('height') || 500;
    var isMax = store.get('isMax') || false;
  // ブラウザ(Chromium)の起動, 初期画面のロード
    mainWindow = new BrowserWindow({
        width: width,
        height: height,
        frame: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: __dirname + '/preload.js',
        }
    });
    mainWindow.loadURL('file://' + __dirname + '/main.html');

    if (isMax) {
        mainWindow.maximize();
    }

    mainWindow.on('resize', function() {
        if (mainWindow.isMaximized()) {
            store.set("isMax", true);
        } else {
            store.set("isMax", false);
            const size = mainWindow.getSize();
            store.set("width", size[0]);
            store.set("height", size[1]);
        }
    });

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
