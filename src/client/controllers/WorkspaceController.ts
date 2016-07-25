import { Workspace } from '../utils/Workspace';
import { Manager } from '../managers/Manager';
import { globals } from '../../client/utils/global';

export class WorkspaceController {

    protected static _workspaces: Manager<Workspace> = new Manager<Workspace>();

    public static get workspaces(): Manager<Workspace> {
        return WorkspaceController._workspaces;
    }

    public static createWorkspace(workspace: Workspace) {
        let tabs: HTMLElement = document.querySelector('section.areas div.tabs') as HTMLElement;
        let workspaces: HTMLElement = document.querySelector('section.areas div.workspaces') as HTMLElement;

        // Create the workspace tab
        let workspaceTab: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
        workspaceTab.classList.add('workspace-tab');
        workspaceTab.setAttribute('data-id', workspace.id);
        workspaceTab.innerHTML = `<span>${workspace.title}</span><span><i class="fa fa-close"></i></span>`;
        var $this = this;

        // Create the workspace
        let workspaceArea: HTMLDivElement = document.createElement('div') as HTMLDivElement;
        workspaceArea.classList.add('hidden');
        workspaceArea.classList.add('workspace-area');
        workspaceArea.setAttribute('data-id', workspace.id);

        // Initialize the workspace
        workspace.init(workspaceTab, workspaceArea);

        // Add the workspace and tab to the document
        workspaces.appendChild(workspaceArea);
        tabs.appendChild(workspaceTab);
        WorkspaceController.workspaces.add(workspace);
        WorkspaceController.focusWorkspace(workspace.id);
    }

    public static focusWorkspace(id: string) {
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
        window.dispatchEvent(new CustomEvent('onWorkspaceChange', { detail: id }));
    }

    public static removeWorkspaces(ids: string[]) {
        ids.forEach(id => {
            WorkspaceController.removeWorkspace(id);
        });
    }

    public static removeWorkspace(id: string) {
        for (let i in this.workspaces.items) {
            let item: Workspace = this.workspaces.items[i] || null;
            if (item.id == id) {
                let itemNext: Workspace = this.workspaces.items[i + 1] || null;
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
                this.workspaces.remove(item);
                if (itemNext) {
                    this.focusWorkspace(itemNext.id);
                } else {
                    let firstItem: Workspace = this.workspaces.items[0] || null;
                    if (firstItem) {
                        this.focusWorkspace(firstItem.id);
                    }
                }
                return;
            }
        }
    }
}