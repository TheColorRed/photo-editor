import { remote } from 'electron';
let Menu = remote.Menu;

var menu = Menu.buildFromTemplate([
    {
        label: 'File',
        submenu: [
            {
                label: 'New...',
                accelerator: 'ctrl+n',
                click: () => {
                    ipcRenderer.send('new-file');
                }
            },
            {
                label: 'Open...',
                accelerator: 'ctrl+o',
                click: () => {
                    ipcRenderer.send('open-file');
                }
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
                    ipcRenderer.send('quit');
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
                accelerator: 'ctrl+v',
                click: () => {
                    ipcRenderer.send('workspace-paste');
                }
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
        label: 'Image'
    },
    {
        label: 'Layer',
        submenu: [
            {
                label: 'Colors',
                submenu: [
                    {
                        label: 'Brightness/Contrast...'
                    },
                    {
                        label: 'Color Balance...'
                    },
                    {
                        label: 'Hue/Saturation...'
                    },
                    {
                        label: 'Colorize...'
                    },
                    {
                        label: 'Thereshold...'
                    },
                    {
                        label: 'Levels...'
                    }
                ]
            },
            {
                label: 'New Layer...'
            },
            {
                label: 'Duplicate Layer...'
            },
            {
                label: 'Delete Layer...'
            }
        ]
    },
    {
        label: 'Filters'
    },
    {
        label: 'Help',
        submenu: [
            {
                label: 'Developer Tools',
                accelerator: 'f12',
                click: () => {
                    ipcRenderer.send('dev-tools');
                }
            }
        ]
    }
]);
Menu.setApplicationMenu(menu);