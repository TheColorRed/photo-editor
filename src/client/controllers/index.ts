const {
    remote, ipcRenderer
} = require('electron');
import path = require('path');

import { Workspace } from '../../client/utils/Workspace';
import { Layers } from '../../client/utils/Layers';
import { Manager } from '../../client/managers/Manager';
import { WorkspaceController } from '../../client/controllers/WorkspaceController';

let Menu = remote.Menu;

let wsController: WorkspaceController = new WorkspaceController();
let workspaces: Manager<Workspace> = new Manager<Workspace>();
wsController.setWorkspaceManager(workspaces);

ipcRenderer.on('workspace.zoomIn', (e) => {
    console.log('ZoomIn');
});
ipcRenderer.on('workspace.zoomOut', (e) => {
    console.log('ZoomOut');
});

ipcRenderer.on('opened-files', (e, files: string[]) => {
    files.forEach(file => {
        let ws = new Workspace(path.basename(file));
        ws.setImage(file).then(loaded => {
            workspaces.add(ws);
            wsController.createWorkspace(ws);
        });
    });
});

var scaller = document.querySelector('.workspace-settings .scale') as HTMLElement;
scaller.addEventListener('change', (e) => {
    var target = e.currentTarget as HTMLSelectElement;

})

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
                    ipcRenderer.send('dev-tools');
                }
            }
        ]
    }
]);
Menu.setApplicationMenu(menu);