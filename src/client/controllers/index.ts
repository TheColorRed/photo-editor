const {
    remote, ipcRenderer
} = require('electron');
import path = require('path');

import { Workspace } from '../../client/utils/Workspace';
import { Layers } from '../../client/utils/Layers';
import { Input } from '../../client/utils/Input';
import { Manager } from '../../client/managers/Manager';
import { WorkspaceController } from '../../client/controllers/WorkspaceController';
import { globals } from '../../client/utils/global';
require('../../client/menus/main');

var scalePresets = document.querySelector('.workspace-settings #scale-presets') as HTMLSelectElement;
var scaleElement = document.querySelector('.workspace-settings #scale') as HTMLInputElement;
var layersElement = document.querySelector('.pallets #layers') as HTMLDivElement;

////////////////////////////////////////////////////////////////////////////////
/// Triggered when the workspace focus changes
////////////////////////////////////////////////////////////////////////////////
window.addEventListener('onWorkspaceChange', (event: CustomEvent) => {
    globals.activeWorkspaceId = event.detail;
    globals.activeWorkspace = WorkspaceController.workspaces.getByKey('id', globals.activeWorkspaceId);
    if (globals.activeWorkspace) {
        window.dispatchEvent(new CustomEvent('onScaleChange', { detail: globals.activeWorkspace.scale * 100 }));
    }
    layersElement.innerHTML = '';
    globals.activeWorkspace.setupLayers(layersElement);
    globals.activeWorkspace.drawWorkspace();
});

////////////////////////////////////////////////////////////////////////////////
/// Zoom in on a workspace
////////////////////////////////////////////////////////////////////////////////
ipcRenderer.on('workspace.zoomIn', e => {
    var scale = scalePresets.selectedIndex + 1;
    if (scale < scalePresets.options.length) {
        scalePresets.selectedIndex = scale;
        scalePresets.dispatchEvent(new Event('change'));
    }
});
////////////////////////////////////////////////////////////////////////////////
/// Zoom out on a workspace
////////////////////////////////////////////////////////////////////////////////
ipcRenderer.on('workspace.zoomOut', e => {
    var scale = scalePresets.selectedIndex - 1;
    if (scale > -1) {
        scalePresets.selectedIndex = scale;
        scalePresets.dispatchEvent(new Event('change'));
    }
});

ipcRenderer.on('workspace.paste', e => {
    if (globals.activeWorkspace) {
        globals.activeWorkspace.pasteToLayer();
    }
})

////////////////////////////////////////////////////////////////////////////////
/// Workspace scale has changed
////////////////////////////////////////////////////////////////////////////////
window.addEventListener('onScaleChange', (event: CustomEvent) => {
    scaleElement.value = event.detail;
});

scalePresets.addEventListener('change', (e) => {
    scaleElement.value = scalePresets.options[scalePresets.selectedIndex].textContent.replace('%', '');
    scaleElement.dispatchEvent(new CustomEvent('scaleChanged'));
});

scaleElement.addEventListener('scaleChanged', (e) => {
    var amount: number = parseInt(scaleElement.value) / 100;
    window.dispatchEvent(new CustomEvent('onScaleImage', { detail: amount }));
});
scaleElement.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        scaleElement.dispatchEvent(new CustomEvent('scaleChanged'));
        scaleElement.blur();
    }
});
scaleElement.addEventListener('blur', (e) => {
    scaleElement.dispatchEvent(new CustomEvent('scaleChanged'));
});
window.addEventListener('onScaleImage', (event: CustomEvent) => {
    globals.activeWorkspace.scaleCanvas(event.detail);
});

////////////////////////////////////////////////////////////////////////////////
/// Close a single workspace
////////////////////////////////////////////////////////////////////////////////
window.addEventListener('onCloseWorkspace', (event: CustomEvent) => {
    WorkspaceController.removeWorkspace(event.detail);
    layersElement.innerHTML = '';
});

////////////////////////////////////////////////////////////////////////////////
/// Close all workspaces
////////////////////////////////////////////////////////////////////////////////
window.addEventListener('onCloseAllWorkspaces', (event: CustomEvent) => {
    let ids: string[] = [];
    WorkspaceController.workspaces.items.forEach(item => {
        ids.push(item.id);
    });
    WorkspaceController.removeWorkspaces(ids);
});

////////////////////////////////////////////////////////////////////////////////
/// Close other workspaces
////////////////////////////////////////////////////////////////////////////////
window.addEventListener('onCloseOtherWorkspaces', (event: CustomEvent) => {
    let ids: string[] = [];
    WorkspaceController.workspaces.items.forEach(item => {
        if (item.id != event.detail) {
            ids.push(item.id);
        }
    });
    WorkspaceController.removeWorkspaces(ids);
});

////////////////////////////////////////////////////////////////////////////////
/// Close saved workspaces
////////////////////////////////////////////////////////////////////////////////
window.addEventListener('onCloseSavedWorkspaces', (event: CustomEvent) => {
    let ids: string[] = [];
    WorkspaceController.workspaces.items.forEach(item => {
        if (!item.isDirty) {
            ids.push(item.id);
        }
    });
    WorkspaceController.removeWorkspaces(ids);
});

////////////////////////////////////////////////////////////////////////////////
/// Close dirty workspaces
////////////////////////////////////////////////////////////////////////////////
window.addEventListener('onCloseDirtyWorkspaces', (event: CustomEvent) => {
    let ids: string[] = [];
    WorkspaceController.workspaces.items.forEach(item => {
        if (item.isDirty) {
            ids.push(item.id);
        }
    });
    WorkspaceController.removeWorkspaces(ids);
});

ipcRenderer.on('save-as', (e, pathInfo: path.ParsedPath) => {
    if (globals.activeWorkspace) {
        e.sender.send('save-data', { pathInfo: pathInfo, content: globals.activeWorkspace.save(pathInfo) });
    }
});

ipcRenderer.on('opened-files', (e, files: string[]) => {
    if (files && files.length > 0) {
        files.forEach(file => {
            let ws = new Workspace(path.basename(file));
            ws.setImage(file).then(loaded => {
                if (loaded) {
                    WorkspaceController.createWorkspace(ws);
                }
            });
        });
    }
});

ipcRenderer.on('new-file', (e, fileSettings: { width: number, height: number, title: string }) => {
    let ws = new Workspace(fileSettings.title, fileSettings.width, fileSettings.height);
    WorkspaceController.createWorkspace(ws);
});

var numberinput = document.querySelector('input#scale') as HTMLInputElement;
Input.numeric(numberinput, 0, 500);