"use strict";
class WorkspaceController {
    setWorkspaceManager(wsManager) {
        this.wsManager = wsManager;
    }
    createWorkspace(workspace) {
        let tabs = document.querySelector('section.areas div.tabs');
        let workspaces = document.querySelector('section.areas div.workspaces');
        let workspaceTab = document.createElement('a');
        workspaceTab.classList.add('workspace-tab');
        workspaceTab.setAttribute('data-id', workspace.id);
        workspaceTab.innerHTML = `<span>${workspace.title}</span><span><i class="fa fa-close"></i></span>`;
        var $this = this;
        workspaceTab.addEventListener('click', (e) => {
            let target = e.currentTarget;
            if (e.button == 1) {
                $this.removeWorkspace(target.getAttribute('data-id'));
            }
            else {
                $this.focusWorkspace(target.getAttribute('data-id'));
            }
        });
        workspaceTab.querySelector('span:last-child').addEventListener('click', (e) => {
            e.stopPropagation();
            var target = e.currentTarget;
            $this.removeWorkspace(target.parentElement.getAttribute('data-id'));
        });
        let workspaceArea = document.createElement('div');
        workspaceArea.classList.add('hidden');
        workspaceArea.classList.add('workspace-area');
        workspaceArea.setAttribute('data-id', workspace.id);
        let transCanvas = document.createElement('canvas');
        transCanvas.width = workspace.width * workspace.scale;
        transCanvas.height = workspace.height * workspace.scale;
        transCanvas.classList.add('transparent');
        this.setTransImage(transCanvas);
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');
        canvas.width = workspace.width * workspace.scale;
        canvas.height = workspace.height * workspace.scale;
        if (workspace.hasImage) {
            context.scale(workspace.scale, workspace.scale);
            context.drawImage(workspace.image, 0, 0);
        }
        workspaceArea.appendChild(transCanvas);
        workspaceArea.appendChild(canvas);
        workspaces.appendChild(workspaceArea);
        tabs.appendChild(workspaceTab);
        this.focusWorkspace(workspace.id);
    }
    setTransImage(canvas) {
        let img = new Image();
        img.src = '../../resources/images/transparent.png';
        img.onload = () => {
            let context = canvas.getContext('2d');
            let pattern = context.createPattern(img, 'repeat');
            context.fillStyle = pattern;
            context.fillRect(0, 0, canvas.width, canvas.height);
        };
    }
    focusWorkspace(id) {
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
    }
    removeWorkspace(id) {
        for (var i in this.wsManager.items) {
            var item = this.wsManager.items[i];
            if (item.id == id) {
                if (item.isDirty) {
                    alert('Workspace is dirty');
                    return;
                }
                let wsa = document.querySelector(`.workspace-area[data-id="${id}"]`);
                let wst = document.querySelector(`.workspace-tab[data-id="${id}"]`);
                wsa.parentNode.removeChild(wsa);
                wst.parentNode.removeChild(wst);
                this.wsManager.remove(item);
                return;
            }
        }
    }
}
exports.WorkspaceController = WorkspaceController;
