"use strict";
const electron_1 = require('electron');
let Menu = electron_1.remote.Menu;
var menu = Menu.buildFromTemplate([
    {
        label: 'File',
        submenu: [
            {
                label: 'New...',
                accelerator: 'ctrl+n',
                click: () => {
                    electron_1.ipcRenderer.send('new-file');
                }
            },
            {
                label: 'Open...',
                accelerator: 'ctrl+o',
                click: () => {
                    electron_1.ipcRenderer.send('open-file');
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
                accelerator: 'ctrl+s',
                click: () => {
                    electron_1.ipcRenderer.send('save');
                }
            },
            {
                label: 'Save As...',
                accelerator: 'ctrl+shift+s',
                click: () => {
                    electron_1.ipcRenderer.send('save-as');
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Quit',
                accelerator: 'ctrl+q',
                click: () => {
                    electron_1.ipcRenderer.send('quit');
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
                    electron_1.ipcRenderer.send('workspace-paste');
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
        submenu: [, {
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
        label: 'Components',
        submenu: [
            {
                label: 'Post Processing Effects',
                submenu: [
                    {
                        label: 'Bloom'
                    },
                    {
                        label: 'Glow'
                    },
                    {
                        label: 'Motion Blur'
                    },
                    {
                        label: 'Smart Blur'
                    },
                    {
                        label: 'Film Grain'
                    },
                    {
                        label: 'Grayscale'
                    },
                    {
                        label: 'Infrared'
                    },
                    {
                        label: 'Nightvision'
                    },
                    {
                        label: 'Depth of field'
                    },
                    {
                        label: 'Color correction'
                    },
                    {
                        label: 'Vignette'
                    },
                    {
                        label: 'Posterization'
                    },
                    {
                        label: 'Fog'
                    },
                    {
                        label: 'Mist'
                    }
                ]
            },
            {
                label: 'Watermark'
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
                    electron_1.ipcRenderer.send('dev-tools');
                }
            }
        ]
    }
]);
Menu.setApplicationMenu(menu);
