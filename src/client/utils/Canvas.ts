import { Manager } from '../managers/Manager';
import { Layer } from './Layer';

const shortid = require('shortid');

export class Canvas {

    protected title: string = '';
    protected id: string;

    protected width: number = 400;
    protected height: number = 400;

	protected _layers: Manager<Layer> = new Manager<Layer>();

    public constructor(title: string, width: number, height: number) {
        this.title = title;
        this.width = width;
        this.height = height;
        this.id = shortid.generate();
    }

    public get layers(): Manager<Layer> {
        return this._layers;
    }

    public createTab() {
        var tabs: HTMLElement = document.querySelector('section.areas div.tabs') as HTMLElement;
        var workspaces: HTMLElement = document.querySelector('section.areas div.workspaces') as HTMLElement;

        // Create the workspace tab
        var workspaceTab: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
        workspaceTab.classList.add('workspace-tab');
        workspaceTab.setAttribute('data-id', this.id);
        workspaceTab.innerHTML = `<span>${this.title}</span><span><i class="fa fa-close"></i></span>`;

        workspaceTab.addEventListener('click', this.focusWorkspace);

        var workspaceTabText: HTMLSpanElement = document.createElement('span') as HTMLSpanElement;
        workspaceTabText.innerText = this.title;

        var workspaceTabClose: HTMLSpanElement = document.createElement('span') as HTMLSpanElement;

        // Create the workspace
        var workspaceArea: HTMLDivElement = document.createElement('div') as HTMLDivElement;
        workspaceArea.classList.add('hidden');
        workspaceArea.classList.add('workspace-area');
        workspaceArea.setAttribute('data-id', this.id);

        // Create the workspace transparent canvas
        var transCanvas: HTMLCanvasElement = document.createElement('canvas') as HTMLCanvasElement;
        transCanvas.width = this.width;
        transCanvas.height = this.height;
        transCanvas.classList.add('transparent');
        this.setTransImage(transCanvas);

        // Create the workspace master canvas
        var canvas: HTMLCanvasElement = document.createElement('canvas') as HTMLCanvasElement;
        canvas.width = this.width;
        canvas.height = this.height;

        // Add the canvases to the workspace
        workspaceArea.appendChild(transCanvas);
        workspaceArea.appendChild(canvas);

        // Add the workspace and tab to the document
        workspaces.appendChild(workspaceArea);
        tabs.appendChild(workspaceTab);

    }

    public removeTab() {

    }

    protected setTransImage(canvas: HTMLCanvasElement): void {
        var img = new Image();
        img.src = '../images/transparent.png';
        img.onload = () => {
            var context: CanvasRenderingContext2D = canvas.getContext('2d');
            var pattern = context.createPattern(img, 'repeat');
            context.fillStyle = pattern;
            context.fillRect(0, 0, canvas.width, canvas.height);
        }
    }

    protected focusTab(target: HTMLAnchorElement) {
        var tabs = document.querySelectorAll('.workspace-tab') as NodeListOf<HTMLAnchorElement>;
        for (var i = 0; i < tabs.length; i++){
            var tab = tabs.item(i);
            tab.classList.remove('active');
        }
        target.classList.add('active');
    }

    protected focusWorkspaceArea(id: string) {
        var areas = document.querySelectorAll('.workspace-area') as NodeListOf<HTMLDivElement>;
        for (var i = 0; i < areas.length; i++){
            var tab = areas.item(i);
            tab.classList.add('hidden');
        }
        var wsa = document.querySelector(`.workspace-area[data-id="${id}"]`) as HTMLDivElement;
        wsa.classList.remove('hidden');
    }

    protected focusWorkspace(e: MouseEvent) {
        var target: HTMLAnchorElement = e.target as HTMLAnchorElement;
        var id = target.getAttribute('data-id');
        this.focusTab(target);
        this.focusWorkspaceArea(id);
    }

    // protected canvas: HTMLCanvasElement;
    // protected canvasTrans: HTMLCanvasElement;
    // protected context: CanvasRenderingContext2D;
    // protected contextTrans: CanvasRenderingContext2D;
    // protected transImg: HTMLImageElement;

    // public init() {
    //     this.transImg = new Image();
    //     this.transImg.src = '../images/transparent.png';

    //     this.canvasTrans = document.querySelector('canvas') as HTMLCanvasElement;
    //     this.contextTrans = this.canvasTrans.getContext('2d');

    //     this.transImg.onload = () => {
    //         var pattern = this.contextTrans.createPattern(this.transImg, 'repeat');
    //         this.contextTrans.fillStyle = pattern;
    //         this.contextTrans.fillRect(0, 0, this.canvasTrans.width, this.canvasTrans.height);
    //     }
    // }

}