"use strict";
const Manager_1 = require('../managers/Manager');
class WorkspaceController {
    static get workspaces() {
        return WorkspaceController._workspaces;
    }
    static createWorkspace(workspace) {
        let tabs = document.querySelector('section.areas div.tabs');
        let workspaces = document.querySelector('section.areas div.workspaces');
        let workspaceTab = document.createElement('a');
        workspaceTab.classList.add('workspace-tab');
        workspaceTab.setAttribute('data-id', workspace.id);
        workspaceTab.innerHTML = `<span>${workspace.title}</span><span><i class="fa fa-close"></i></span>`;
        var $this = this;
        let workspaceArea = document.createElement('div');
        workspaceArea.classList.add('hidden');
        workspaceArea.classList.add('workspace-area');
        workspaceArea.setAttribute('data-id', workspace.id);
        workspace.init(workspaceTab, workspaceArea);
        workspaces.appendChild(workspaceArea);
        tabs.appendChild(workspaceTab);
        WorkspaceController.workspaces.add(workspace);
        WorkspaceController.focusWorkspace(workspace.id);
    }
    static focusWorkspace(id) {
        let tabs = document.querySelectorAll('.workspace-tab');
        for (let i = 0; i < tabs.length; i++) {
            let tab = tabs.item(i);
            tab.classList.remove('active');
        }
        let areas = document.querySelectorAll('.workspace-area');
        for (let i = 0; i < areas.length; i++) {
            let area = areas.item(i);
            area.classList.add('hidden');
        }
        let wsa = document.querySelector(`.workspace-area[data-id="${id}"]`);
        let wst = document.querySelector(`.workspace-tab[data-id="${id}"]`);
        wsa.classList.remove('hidden');
        wst.classList.add('active');
        window.dispatchEvent(new CustomEvent('onWorkspaceChange', { detail: id }));
    }
    static removeWorkspaces(ids) {
        ids.forEach(id => {
            WorkspaceController.removeWorkspace(id);
        });
    }
    static removeWorkspace(id) {
        for (let i in this.workspaces.items) {
            let item = this.workspaces.items[i] || null;
            if (item.id == id) {
                let itemNext = this.workspaces.items[i + 1] || null;
                if (item.isDirty) {
                    alert('Workspace is dirty');
                    return;
                }
                let wsa = document.querySelector(`.workspace-area[data-id="${id}"]`);
                let wst = document.querySelector(`.workspace-tab[data-id="${id}"]`);
                wsa.parentNode.removeChild(wsa);
                wst.parentNode.removeChild(wst);
                this.workspaces.remove(item);
                if (itemNext) {
                    this.focusWorkspace(itemNext.id);
                }
                else {
                    let firstItem = this.workspaces.items[0] || null;
                    if (firstItem) {
                        this.focusWorkspace(firstItem.id);
                    }
                }
                return;
            }
        }
    }
}
WorkspaceController._workspaces = new Manager_1.Manager();
exports.WorkspaceController = WorkspaceController;
