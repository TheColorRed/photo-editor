"use strict";
const { ipcMain, app, BrowserWindow, dialog, globalShortcut } = require('electron');
let keybindings = require('../resources/settings/keybindings.json');
let mainWindow;
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 600,
        show: false
    });
    mainWindow.loadURL(`file://${__dirname}/../resources/views/index.html`);
    mainWindow.on('ready', () => {
        mainWindow.show();
    });
    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });
    keybindings.forEach(binding => {
        globalShortcut.register(binding.key, () => {
            mainWindow.webContents.send(binding.command);
        });
    });
    require('./listeners/save')(mainWindow);
    require('./listeners/open')(mainWindow);
    require('./listeners/new')(mainWindow);
});
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
ipcMain.on('workspace-paste', (e) => {
    mainWindow.webContents.send('workspace.paste');
});
ipcMain.on('quit', () => {
    mainWindow.close();
});
ipcMain.on('dev-tools', () => {
    mainWindow.webContents.openDevTools();
});
