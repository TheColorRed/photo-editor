"use strict";
const electron_1 = require('electron');
class WindowManager {
    createWindow(settings) {
        var newWindow = new electron_1.BrowserWindow(settings.windowSettings || {});
        newWindow.loadURL(`file://${settings.fileName}`);
        newWindow.setAlwaysOnTop(settings.alwaysOnTop || false);
        electron_1.Menu.setApplicationMenu(electron_1.Menu.buildFromTemplate(settings.menuTemplate || []));
        newWindow.on('closed', () => {
            newWindow = null;
        });
        return newWindow;
    }
    setMenu(menuTemplate) {
        electron_1.Menu.setApplicationMenu(electron_1.Menu.buildFromTemplate(menuTemplate));
    }
}
exports.WindowManager = WindowManager;
