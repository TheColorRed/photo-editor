/// <reference path="../../typings/github-electron/github-electron.d.ts" />

const {
    ipcMain, app, BrowserWindow, dialog, ipcRenderer, globalShortcut
} = require('electron');

var keybindings: Array<{
    key: string,
    command: string
}> = require('../resources/settings/keybindings.json');

// import { MainMenu } from './menu';
// import { WindowManager } from './managers/Window';

app.on('ready', () => {

    // Setup the main window
    var mainWindow = new BrowserWindow({
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

    // Register key bindings
    keybindings.forEach(binding => {
        globalShortcut.register(binding.key, () => {
            mainWindow.webContents.send(binding.command);
        });
    });

    // Setup the new file window
    ipcMain.on('new-file', () => {
        var newFileWindow = new BrowserWindow({
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
            // newFileWindow.webContents.openDevTools();
        });
    });

    ipcMain.on('open-file', (event) => {
        dialog.showOpenDialog(mainWindow, {
            title: "Open Image",
            filters: [
                {name: 'Images', extensions: ['png', 'jpg', 'gif', 'pdd']}
            ],
            properties: ["multiSelections", "openFile"]
        }, files => {
            event.sender.send('opened-files', files);
        });
    });

    ipcMain.on('quit', () => {
        mainWindow.close();
    });

    ipcMain.on('dev-tools', () => {
        mainWindow.webContents.openDevTools();
    })
});




// const windowManager: WindowManager = new WindowManager();

// const app = electron.app;
// const BrowserWindow = electron.BrowserWindow;
// let mainWindow: Electron.BrowserWindow;

// function createWindow() {
//     let mainWindow =
//         windowManager.createWindow({
//             fileName: `${__dirname}/../client/resources/views/index.html`,
//             windowSettings: {
//                 width: 1024,
//                 height: 600
//             }
//         });
//     electron.Menu.setApplicationMenu(electron.Menu.buildFromTemplate(MainMenu.getMenu(mainWindow)));
// }


// function createWindow() {
//     mainWindow = new BrowserWindow({ width: 800, height: 600 });

//     mainWindow.loadURL(`file://${__dirname}/resources/views/main/index.html`);

//     // Setup the main menu
//     electron.Menu.setApplicationMenu(electron.Menu.buildFromTemplate(MainMenu.getMenu(mainWindow)));

//     mainWindow.on('closed', () => {
//         mainWindow = null;
//     });
// }


// app.on('ready', () => {
//     let mainWindow: Electron.BrowserWindow =
//         windowManager.createWindow({
//             fileName: `${__dirname}/../client/resources/views/index.html`,
//             windowSettings: {
//                 width: 1024,
//                 height: 600
//             }
//         });
//     electron.Menu.setApplicationMenu(electron.Menu.buildFromTemplate(MainMenu.getMenu(mainWindow)));
// });
// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         app.quit();
//     }
// });
// app.on('active', () => {
//     createWindow();
// });