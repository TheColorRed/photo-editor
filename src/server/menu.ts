
export class MainMenu {



    public static getMenu(browser: Electron.BrowserWindow): Electron.MenuItemOptions[] {
        var menu: Electron.MenuItemOptions[] = [
            {
                label: 'File',
                submenu: [
                    {
                        label: 'New...',
                        accelerator: 'ctrl+n'
                    },
                    {
                        label: 'Open...',
                        accelerator: 'ctrl+o'
                    },
                    {
                        label: 'Open Recent'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Close',
                        accelerator: 'ctrl+w'
                    },
                    {
                        label: 'Close Other',
                        accelerator: 'ctrl+alt+w'
                    },
                    {
                        label: 'Close All',
                        accelerator: 'ctrl+sift+w'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Save',
                        accelerator: 'ctrl+s'
                    },
                    {
                        label: 'Save As...',
                        accelerator: 'ctrl+shift+s'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Quit',
                        accelerator: 'ctrl+q',
                        click: () => {
                            browser.close();
                        }
                    }
                ]
            },
            {
                label: 'Edit',
                submenu: [
                    {
                        label: 'Undo',
                        accelerator: 'ctrl+z'
                    },
                    {
                        label: 'Redo',
                        accelerator: 'ctrl+y'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Copy',
                        accelerator: 'ctrl+c'
                    },
                    {
                        label: 'Cut',
                        accelerator: 'ctrl+x'
                    },
                    {
                        label: 'Paste',
                        accelerator: 'ctrl+v'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Preferences'
                    }
                ]
            },
            {
                label: 'Help',
                submenu: [
                    {
                        label: 'Developer Tools',
                        accelerator: 'f12',
                        click: () => {
                            browser.webContents.openDevTools();
                        }
                    }
                ]
            }
        ];
        return menu;
    }
}