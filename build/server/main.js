"use strict";
var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var ipc = electron.ipcMain;
app.on('ready', function () {
    var mainWindow = new BrowserWindow({
        width: 1024,
        height: 600,
        show: false
    });
    mainWindow.loadURL(__dirname + "/../resources/views/index.html");
    mainWindow.on('ready-to-show', function () {
        mainWindow.show();
    });
    ipc.on('new-file', function () {
        var newFileWindow = new BrowserWindow({
            width: 500,
            height: 300,
            modal: true,
            parent: mainWindow,
            minimizable: false,
            resizable: false,
            show: false
        });
        newFileWindow.loadURL(__dirname + "/../resources/views/newFile.html");
        newFileWindow.setMenu(null);
        newFileWindow.on('ready-to-show', function () {
            newFileWindow.show();
            newFileWindow.webContents.openDevTools();
        });
    });
    ipc.on('quit', function () {
        mainWindow.close();
    });
    ipc.on('dev-tools', function () {
        mainWindow.webContents.openDevTools();
    });
});
