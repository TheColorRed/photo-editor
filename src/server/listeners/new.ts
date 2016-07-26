const { dialog, ipcMain, BrowserWindow } = require('electron');
import fs = require('fs');
import path = require('path');

export = (mainWindow) => {
    let newFileWindow: Electron.BrowserWindow;
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

        newFileWindow.loadURL(`file://${__dirname}/../../resources/views/newFile.html`);
        newFileWindow.setMenu(null);
        newFileWindow.on('ready-to-show', () => {
            newFileWindow.show();
        });

        newFileWindow.on('closed', function () {
            newFileWindow = null;
        });
    });

    // Close the file window when the 'OK' button is pressed
    ipcMain.on('new-file-create', (event, settings) => {
        mainWindow.webContents.send('new-file', settings);
        if (newFileWindow) {
            newFileWindow.close();
        }
    });
}