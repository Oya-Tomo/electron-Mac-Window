const { contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld(
    "api", {
        send_quit: () => {
            ipcRenderer.send('quit', true);
        },
        send_mini: () => {
            ipcRenderer.send('mini', true);
        },
        send_resize: () => {
            ipcRenderer.send('resize', true);
        }
    }
);
