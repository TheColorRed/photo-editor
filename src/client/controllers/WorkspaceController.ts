import { Workspace } from '../utils/Workspace';
import { Manager } from '../managers/Manager';

export class WorkspaceController {

    protected wsManager: Manager<Workspace>;

    public setWorkspaceManager(wsManager: Manager<Workspace>) {
        this.wsManager = wsManager;
    }

    public createWorkspace(workspace: Workspace) {
        let tabs: HTMLElement = document.querySelector('section.areas div.tabs') as HTMLElement;
        let workspaces: HTMLElement = document.querySelector('section.areas div.workspaces') as HTMLElement;

        // Create the workspace tab
        let workspaceTab: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
        workspaceTab.classList.add('workspace-tab');
        workspaceTab.setAttribute('data-id', workspace.id);
        workspaceTab.innerHTML = `<span>${workspace.title}</span><span><i class="fa fa-close"></i></span>`;
        var $this = this;
        workspaceTab.addEventListener('click', (e) => {
            let target: HTMLAnchorElement = e.currentTarget as HTMLAnchorElement;
            $this.focusWorkspace(target.getAttribute('data-id'));
        });
        workspaceTab.querySelector('span:last-child').addEventListener('click', (e) => {
            e.stopPropagation();
            var target = e.currentTarget as HTMLElement;
            $this.removeWorkspace(target.parentElement.getAttribute('data-id'));
        });

        // Create the workspace
        let workspaceArea: HTMLDivElement = document.createElement('div') as HTMLDivElement;
        workspaceArea.classList.add('hidden');
        workspaceArea.classList.add('workspace-area');
        workspaceArea.setAttribute('data-id', workspace.id);

        // Create the workspace transparent canvas
        let transCanvas: HTMLCanvasElement = document.createElement('canvas') as HTMLCanvasElement;
        transCanvas.width = workspace.width;
        transCanvas.height = workspace.height;
        transCanvas.classList.add('transparent');
        this.setTransImage(transCanvas);

        // Create the workspace master canvas
        let canvas: HTMLCanvasElement = document.createElement('canvas') as HTMLCanvasElement;
        canvas.width = workspace.width;
        canvas.height = workspace.height;

        // Add the canvases to the workspace
        workspaceArea.appendChild(transCanvas);
        workspaceArea.appendChild(canvas);

        // Add the workspace and tab to the document
        workspaces.appendChild(workspaceArea);
        tabs.appendChild(workspaceTab);
        this.focusWorkspace(workspace.id);
    }

    protected setTransImage(canvas: HTMLCanvasElement): void {
        let img = new Image();
        img.src = '../../images/transparent.png';
        img.onload = () => {
            let context: CanvasRenderingContext2D = canvas.getContext('2d');
            let pattern = context.createPattern(img, 'repeat');
            context.fillStyle = pattern;
            context.fillRect(0, 0, canvas.width, canvas.height);
        }
    }

    protected focusWorkspace(id: string) {
        // Deactivate all the tabs
        let tabs = document.querySelectorAll('.workspace-tab') as NodeListOf<HTMLAnchorElement>;
        for (let i = 0; i < tabs.length; i++){
            let tab = tabs.item(i);
            tab.classList.remove('active');
        }

        // Hide all the workspace areas
        let areas = document.querySelectorAll('.workspace-area') as NodeListOf<HTMLDivElement>;
        for (let i = 0; i < areas.length; i++){
            let area = areas.item(i);
            area.classList.add('hidden');
        }

        // Activate the chosen workspace area and tab
        let wsa = document.querySelector(`.workspace-area[data-id="${id}"]`) as HTMLElement;
        let wst = document.querySelector(`.workspace-tab[data-id="${id}"]`) as HTMLElement;
        wsa.classList.remove('hidden');
        wst.classList.add('active');
    }

    public removeWorkspace(id: string) {
        for (var i in this.wsManager.items) {
            var item = this.wsManager.items[i];
            if (item.id == id) {
                if (item.isDirty) {
                    alert('Workspace is dirty');
                    return;
                }
                // Find and remove the workspace and tab from the DOM
                let wsa = document.querySelector(`.workspace-area[data-id="${id}"]`) as HTMLElement;
                let wst = document.querySelector(`.workspace-tab[data-id="${id}"]`) as HTMLElement;
                wsa.parentNode.removeChild(wsa);
                wst.parentNode.removeChild(wst);
                // Remove the workspace from the workspace manager
                this.wsManager.remove(item);
                return;
            }
        }
    }
}