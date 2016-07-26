"use strict";
const { ipcMain, app, BrowserWindow, dialog, globalShortcut } = require('electron');
const fs = require('fs');
const path = require('path');
let keybindings = require('../resources/settings/keybindings.json');
let mainWindow;
let newFileWindow;
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
});
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
ipcMain.on('new-file', () => {
    newFileWindow = new BrowserWindow({
        width: 500,
        height: 300,
        modal: true,
        parent: mainWindow,
        minimizable: false,
        resizable: false,
        show: false
    });
    newFileWindow.loadURL(`file://${__dirname}/../resources/views/newFile.html`);
    newFileWindow.setMenu(null);
    newFileWindow.on('ready-to-show', () => {
        newFileWindow.show();
    });
    newFileWindow.on('closed', function () {
        newFileWindow = null;
    });
});
ipcMain.on('save-as', () => {
    dialog.showSaveDialog(mainWindow, {
        title: 'Save Image',
        filters: [
            { name: '.png', extensions: ['png'] },
            { name: '.jpg', extensions: ['jpeg', 'jpg'] },
        ]
    }, filename => {
        let ext = filename.substr(filename.lastIndexOf('.') + 1);
        mainWindow.webContents.send('save', path.parse(filename));
    });
});
ipcMain.on('save-data', (e, data) => {
    fs.writeFile(path.format(data.pathInfo), data.content.replace(/.+?,/, ''), 'base64', (err) => {
        if (err) {
            console.log(err);
        }
    });
});
ipcMain.on('new-file-create', (event, settings) => {
    mainWindow.webContents.send('new-file', settings);
    if (newFileWindow) {
        newFileWindow.close();
    }
});
ipcMain.on('open-file', (event) => {
    dialog.showOpenDialog(mainWindow, {
        title: "Open Image",
        filters: [
            { name: 'Images', extensions: ['png', 'jpg', 'gif', 'pdd'] },
        ],
        properties: ["multiSelections", "openFile"]
    }, files => {
        if (files && files.length > 0) {
            event.sender.send('opened-files', files);
        }
    });
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
