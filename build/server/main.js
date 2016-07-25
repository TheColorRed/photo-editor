const { ipcMain, app, BrowserWindow, dialog, ipcRenderer, globalShortcut } = require('electron');
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
        if (files && files.length > 1) {
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
