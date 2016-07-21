"use strict";
var electron_1 = require('electron');
var WindowManager = (function () {
    function WindowManager() {
    }
    WindowManager.prototype.createWindow = function (settings) {
        var newWindow = new electron_1.BrowserWindow(settings.windowSettings || {});
        newWindow.loadURL("file://" + settings.fileName);
        newWindow.setAlwaysOnTop(settings.alwaysOnTop || false);
        electron_1.Menu.setApplicationMenu(electron_1.Menu.buildFromTemplate(settings.menuTemplate || []));
        newWindow.on('closed', function () {
            newWindow = null;
        });
        return newWindow;
    };
    WindowManager.prototype.setMenu = function (menuTemplate) {
        electron_1.Menu.setApplicationMenu(electron_1.Menu.buildFromTemplate(menuTemplate));
    };
    return WindowManager;
}());
exports.WindowManager = WindowManager;
