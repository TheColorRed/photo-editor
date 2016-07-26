const { dialog, ipcMain } = require('electron');
import fs = require('fs');
import path = require('path');

export = (mainWindow) => {
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
}