/// <reference path="../../typings/github-electron/github-electron.d.ts" />

const {
    ipcMain, app, BrowserWindow, dialog, globalShortcut
} = require('electron');

import fs = require('fs');
import path = require('path');

let keybindings: Array<{
    key: string,
    command: string
}> = require('../resources/settings/keybindings.json');

let mainWindow: Electron.BrowserWindow;

app.on('ready', () => {
    ////////////////////////////////////////////////////////////////////////////
    /// Setup the main window
    ////////////////////////////////////////////////////////////////////////////
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

    ////////////////////////////////////////////////////////////////////////////
    /// Register key bindings to the main window
    ////////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////////
/// Handle pasting
////////////////////////////////////////////////////////////////////////////////
ipcMain.on('workspace-paste', (e) => {
    mainWindow.webContents.send('workspace.paste');
});

////////////////////////////////////////////////////////////////////////////////
/// Handle app closure
////////////////////////////////////////////////////////////////////////////////
ipcMain.on('quit', () => {
    mainWindow.close();
});

////////////////////////////////////////////////////////////////////////////////
/// Open the main window dev tools for debugging
////////////////////////////////////////////////////////////////////////////////
ipcMain.on('dev-tools', () => {
    mainWindow.webContents.openDevTools();
});