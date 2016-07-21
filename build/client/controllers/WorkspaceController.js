"use strict";
var WorkspaceController = (function () {
    function WorkspaceController() {
    }
    WorkspaceController.prototype.setWorkspaceManager = function (wsManager) {
        this.wsManager = wsManager;
    };
    WorkspaceController.prototype.createWorkspace = function (workspace) {
        var tabs = document.querySelector('section.areas div.tabs');
        var workspaces = document.querySelector('section.areas div.workspaces');
        var workspaceTab = document.createElement('a');
        workspaceTab.classList.add('workspace-tab');
        workspaceTab.setAttribute('data-id', workspace.id);
        workspaceTab.innerHTML = "<span>" + workspace.title + "</span><span><i class=\"fa fa-close\"></i></span>";
        var $this = this;
        workspaceTab.addEventListener('click', function (e) {
            var target = e.currentTarget;
            $this.focusWorkspace(target.getAttribute('data-id'));
        });
        workspaceTab.querySelector('span:last-child').addEventListener('click', function (e) {
            e.stopPropagation();
            var target = e.currentTarget;
            $this.removeWorkspace(target.parentElement.getAttribute('data-id'));
        });
        var workspaceArea = document.createElement('div');
        workspaceArea.classList.add('hidden');
        workspaceArea.classList.add('workspace-area');
        workspaceArea.setAttribute('data-id', workspace.id);
        var transCanvas = document.createElement('canvas');
        transCanvas.width = workspace.width;
        transCanvas.height = workspace.height;
        transCanvas.classList.add('transparent');
        this.setTransImage(transCanvas);
        var canvas = document.createElement('canvas');
        canvas.width = workspace.width;
        canvas.height = workspace.height;
        workspaceArea.appendChild(transCanvas);
        workspaceArea.appendChild(canvas);
        workspaces.appendChild(workspaceArea);
        tabs.appendChild(workspaceTab);
        this.focusWorkspace(workspace.id);
    };
    WorkspaceController.prototype.setTransImage = function (canvas) {
        var img = new Image();
        img.src = '../../images/transparent.png';
        img.onload = function () {
            var context = canvas.getContext('2d');
            var pattern = context.createPattern(img, 'repeat');
            context.fillStyle = pattern;
            context.fillRect(0, 0, canvas.width, canvas.height);
        };
    };
    WorkspaceController.prototype.focusWorkspace = function (id) {
        var tabs = document.querySelectorAll('.workspace-tab');
        for (var i = 0; i < tabs.length; i++) {
            var tab = tabs.item(i);
            tab.classList.remove('active');
        }
        var areas = document.querySelectorAll('.workspace-area');
        for (var i = 0; i < areas.length; i++) {
            var area = areas.item(i);
            area.classList.add('hidden');
        }
        var wsa = document.querySelector(".workspace-area[data-id=\"" + id + "\"]");
        var wst = document.querySelector(".workspace-tab[data-id=\"" + id + "\"]");
        wsa.classList.remove('hidden');
        wst.classList.add('active');
    };
    WorkspaceController.prototype.removeWorkspace = function (id) {
        for (var i in this.wsManager.items) {
            var item = this.wsManager.items[i];
            if (item.id == id) {
                if (item.isDirty) {
                    alert('Workspace is dirty');
                    return;
                }
                var wsa = document.querySelector(".workspace-area[data-id=\"" + id + "\"]");
                var wst = document.querySelector(".workspace-tab[data-id=\"" + id + "\"]");
                wsa.parentNode.removeChild(wsa);
                wst.parentNode.removeChild(wst);
                this.wsManager.remove(item);
                return;
            }
        }
    };
    return WorkspaceController;
}());
exports.WorkspaceController = WorkspaceController;
