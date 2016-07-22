"use strict";
const electron = require('electron');
const path = require('path');
const Workspace_1 = require('../../client/utils/Workspace');
const Manager_1 = require('../../client/managers/Manager');
const WorkspaceController_1 = require('../../client/controllers/WorkspaceController');
var remote = electron.remote;
var ipc = electron.ipcRenderer;
var Menu = remote.Menu;
let wsController = new WorkspaceController_1.WorkspaceController();
let workspaces = new Manager_1.Manager();
wsController.setWorkspaceManager(workspaces);
ipc.on('opened-files', (e, files) => {
    files.forEach(file => {
        let ws = new Workspace_1.Workspace(path.basename(file));
        ws.setImage(file).then(loaded => {
            workspaces.add(ws);
            wsController.createWorkspace(ws);
        });
    });
});
var scaller = document.querySelector('.workspace-settings .scale');
scaller.addEventListener('change', (e) => {
    var target = e.currentTarget;
    console.log(target.value);
});
var menu = Menu.buildFromTemplate([
    {
        label: 'File',
        submenu: [
            {
                label: 'New...',
                accelerator: 'ctrl+n',
                click: () => {
                    ipc.send('new-file');
                }
            },
            {
                label: 'Open...',
                accelerator: 'ctrl+o',
                click: () => {
                    ipc.send('open-file');
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
                    ipc.send('quit');
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
                    ipc.send('dev-tools');
                }
            }
        ]
    }
]);
Menu.setApplicationMenu(menu);
