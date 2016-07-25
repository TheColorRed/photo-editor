"use strict";
const { remote, ipcRenderer } = require('electron');
const path = require('path');
const Workspace_1 = require('../../client/utils/Workspace');
const Input_1 = require('../../client/utils/Input');
const WorkspaceController_1 = require('../../client/controllers/WorkspaceController');
const global_1 = require('../../client/utils/global');
require('../../client/menus/main');
var scalePresets = document.querySelector('.workspace-settings #scale-presets');
var scaleElement = document.querySelector('.workspace-settings #scale');
var layersElement = document.querySelector('.pallets #layers');
window.addEventListener('onWorkspaceChange', (event) => {
    global_1.globals.activeWorkspaceId = event.detail;
    global_1.globals.activeWorkspace = WorkspaceController_1.WorkspaceController.workspaces.getByKey('id', global_1.globals.activeWorkspaceId);
    if (global_1.globals.activeWorkspace) {
        window.dispatchEvent(new CustomEvent('onScaleChange', { detail: global_1.globals.activeWorkspace.scale * 100 }));
    }
    layersElement.innerHTML = '';
    global_1.globals.activeWorkspace.setupLayers(layersElement);
    global_1.globals.activeWorkspace.drawWorkspace();
});
ipcRenderer.on('workspace.zoomIn', e => {
    var scale = scalePresets.selectedIndex + 1;
    if (scale < scalePresets.options.length) {
        scalePresets.selectedIndex = scale;
        scalePresets.dispatchEvent(new Event('change'));
    }
});
ipcRenderer.on('workspace.zoomOut', e => {
    var scale = scalePresets.selectedIndex - 1;
    if (scale > -1) {
        scalePresets.selectedIndex = scale;
        scalePresets.dispatchEvent(new Event('change'));
    }
});
ipcRenderer.on('workspace.paste', e => {
    if (global_1.globals.activeWorkspace) {
        global_1.globals.activeWorkspace.pasteToLayer();
    }
});
window.addEventListener('onScaleChange', (event) => {
    scaleElement.value = event.detail;
});
scalePresets.addEventListener('change', (e) => {
    scaleElement.value = scalePresets.options[scalePresets.selectedIndex].textContent.replace('%', '');
    scaleElement.dispatchEvent(new CustomEvent('scaleChanged'));
});
scaleElement.addEventListener('scaleChanged', (e) => {
    var amount = parseInt(scaleElement.value) / 100;
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
window.addEventListener('onScaleImage', (event) => {
    global_1.globals.activeWorkspace.scaleCanvas(event.detail);
});
window.addEventListener('onCloseWorkspace', (event) => {
    WorkspaceController_1.WorkspaceController.removeWorkspace(event.detail);
    layersElement.innerHTML = '';
});
window.addEventListener('onCloseAllWorkspaces', (event) => {
    let ids = [];
    WorkspaceController_1.WorkspaceController.workspaces.items.forEach(item => {
        ids.push(item.id);
    });
    WorkspaceController_1.WorkspaceController.removeWorkspaces(ids);
});
window.addEventListener('onCloseOtherWorkspaces', (event) => {
    let ids = [];
    WorkspaceController_1.WorkspaceController.workspaces.items.forEach(item => {
        if (item.id != event.detail) {
            ids.push(item.id);
        }
    });
    WorkspaceController_1.WorkspaceController.removeWorkspaces(ids);
});
window.addEventListener('onCloseSavedWorkspaces', (event) => {
    let ids = [];
    WorkspaceController_1.WorkspaceController.workspaces.items.forEach(item => {
        if (!item.isDirty) {
            ids.push(item.id);
        }
    });
    WorkspaceController_1.WorkspaceController.removeWorkspaces(ids);
});
window.addEventListener('onCloseDirtyWorkspaces', (event) => {
    let ids = [];
    WorkspaceController_1.WorkspaceController.workspaces.items.forEach(item => {
        if (item.isDirty) {
            ids.push(item.id);
        }
    });
    WorkspaceController_1.WorkspaceController.removeWorkspaces(ids);
});
ipcRenderer.on('opened-files', (e, files) => {
    if (files) {
        files.forEach(file => {
            let ws = new Workspace_1.Workspace(path.basename(file));
            ws.setImage(file).then(loaded => {
                if (loaded) {
                    WorkspaceController_1.WorkspaceController.createWorkspace(ws);
                }
            });
        });
    }
});
ipcRenderer.on('new-file', (e, fileSettings) => {
    let ws = new Workspace_1.Workspace(fileSettings.title, fileSettings.width, fileSettings.height);
    WorkspaceController_1.WorkspaceController.createWorkspace(ws);
});
var numberinput = document.querySelector('input#scale');
Input_1.Input.numeric(numberinput, 0, 500);
