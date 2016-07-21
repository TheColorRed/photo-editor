/// <reference path="../../typings/github-electron/github-electron.d.ts" />

import electron = require('electron');
import { MainMenu } from './menu';

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow: Electron.BrowserWindow;

function createWindow() {
    mainWindow = new BrowserWindow({ width: 800, height: 600 });

    mainWindow.loadURL(`file://${__dirname}/resources/views/main/index.html`);

    // Setup the main menu
    electron.Menu.setApplicationMenu(electron.Menu.buildFromTemplate(MainMenu.getMenu(mainWindow)));

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}


app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('active', () => {
    createWindow();
});