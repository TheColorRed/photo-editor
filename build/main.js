/// <reference path="../../typings/github-electron/github-electron.d.ts" />
"use strict";
var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({ width: 800, height: 600 });
    mainWindow.loadURL("file://" + __dirname + "/resources/views/index.html");
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}
app.on('ready', createWindow);
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('active', function () {
    createWindow();
});
