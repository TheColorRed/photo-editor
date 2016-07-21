
import { BrowserWindow, Menu } from 'electron';

export class WindowManager {

    public createWindow(settings: {
        fileName: string,
        windowSettings: Electron.BrowserWindowOptions,
        menuTemplate?: Electron.MenuItemOptions[],
        alwaysOnTop?: boolean
    }): Electron.BrowserWindow {

        var newWindow = new BrowserWindow(settings.windowSettings || {});

        newWindow.loadURL(`file://${settings.fileName}`);

        newWindow.setAlwaysOnTop(settings.alwaysOnTop || false);

        // Setup the main menu
        Menu.setApplicationMenu(Menu.buildFromTemplate(settings.menuTemplate || []));

        newWindow.on('closed', () => {
            newWindow = null;
        });

        return newWindow;
    }

    public setMenu(menuTemplate: Electron.MenuItemOptions[]) {
        Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
    }

}