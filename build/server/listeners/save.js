"use strict";
const { dialog, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
module.exports = (mainWindow) => {
    ipcMain.on('save-as', () => {
        dialog.showSaveDialog(mainWindow, {
            title: 'Save Image',
            filters: [
                { name: '.png', extensions: ['png'] },
                { name: '.jpg', extensions: ['jpeg', 'jpg'] },
            ]
        }, filename => {
            if (filename) {
                let ext = filename.substr(filename.lastIndexOf('.') + 1);
                mainWindow.webContents.send('save-as', path.parse(filename));
            }
        });
    });
    ipcMain.on('save-data', (e, data) => {
        fs.writeFile(path.format(data.pathInfo), data.content.replace(/.+?,/, ''), 'base64', (err) => {
            if (err) {
                console.log(err);
            }
        });
    });
};
