/// <reference path="../../typings/github-electron/github-electron.d.ts" />
"use strict";
var electron = require('electron');
var menu_1 = require('./menu');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({ width: 800, height: 600 });
    mainWindow.loadURL("file://" + __dirname + "/resources/views/main/index.html");
    // Setup the main menu
    electron.Menu.setApplicationMenu(electron.Menu.buildFromTemplate(menu_1.MainMenu.getMenu(mainWindow)));
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
