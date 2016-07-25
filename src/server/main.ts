/// <reference path="../../typings/github-electron/github-electron.d.ts" />

const {
    ipcMain, app, BrowserWindow, dialog, ipcRenderer, globalShortcut
} = require('electron');

let keybindings: Array<{
    key: string,
    command: string
}> = require('../resources/settings/keybindings.json');

let mainWindow: Electron.BrowserWindow;
let newFileWindow: Electron.BrowserWindow;

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
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});


////////////////////////////////////////////////////////////////////////////////
///
/// Register ipc listeners
///
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/// Setup the 'New File' window
////////////////////////////////////////////////////////////////////////////////
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

// Close the file window when the 'OK' button is pressed
ipcMain.on('new-file-create', (event, settings) => {
    mainWindow.webContents.send('new-file', settings);
    if (newFileWindow) {
        newFileWindow.close();
    }
});

////////////////////////////////////////////////////////////////////////////////
/// Setup the opening of files
////////////////////////////////////////////////////////////////////////////////
ipcMain.on('open-file', (event) => {
    dialog.showOpenDialog(mainWindow, {
        title: "Open Image",
        filters: [
            {name: 'Images', extensions: ['png', 'jpg', 'gif', 'pdd']},
        ],
        properties: ["multiSelections", "openFile"]
    }, files => {
        if (files && files.length > 1) {
            event.sender.send('opened-files', files);
        }
    });
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