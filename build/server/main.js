const { ipcMain, app, BrowserWindow, dialog, ipcRenderer, globalShortcut } = require('electron');
var keybindings = require('../resources/settings/keybindings.json');
app.on('ready', () => {
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
    keybindings.forEach(binding => {
        globalShortcut.register(binding.key, () => {
            mainWindow.webContents.send(binding.command);
        });
    });
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
        });
    });
    ipcMain.on('open-file', (event) => {
        dialog.showOpenDialog(mainWindow, {
            title: "Open Image",
            filters: [
                { name: 'Images', extensions: ['png', 'jpg', 'gif', 'pdd'] }
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
    });
});
