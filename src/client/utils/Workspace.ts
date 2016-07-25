import { Manager } from '../managers/Manager';
import { WorkspaceController } from '../../client/controllers/WorkspaceController';
import { Layer } from './Layer';
import { globals } from '../../client/utils/global';

const { remote } = require('electron');
import cp = require('child_process');
import path = require('path');
let Menu = remote.Menu;

const tabMenu = require('../../client/menus/workspaceTab');

const shortid = require('shortid');
import { Buffer } from 'buffer';

export class Workspace {

    public scale: number = 1;

    protected _title: string = '';
    protected _id: string;

    protected _isDirty: boolean = false;

    protected _width: number = 	1;
    protected _height: number = 1;

    // protected _image: HTMLImageElement;

    protected _layers: Manager<Layer> = new Manager<Layer>();

    protected canvas: HTMLCanvasElement;
    protected canvasTrans: HTMLCanvasElement;

    public constructor(title: string, width?: number, height?: number) {
        this._title = title;
        this._width = width;
        this._height = height;
        this._id = shortid.generate();
    }

    public init(workspaceTab: HTMLElement, workspaceArea: HTMLElement) {
        var $this = this;
        workspaceTab.addEventListener('mousedown', (e) => {
            let target: HTMLAnchorElement = e.currentTarget as HTMLAnchorElement;
            // On left mouse button click
            if (e.which == 1){
                WorkspaceController.focusWorkspace($this.id);
            }
            // On middle mouse button click
            else if (e.which == 2) {
                WorkspaceController.removeWorkspace($this.id);
                window.dispatchEvent(new CustomEvent('onWorkspaceChange', { detail: $this.id }));
            }
            // On right mouse button click
            else if (e.which == 3) {
                Menu.buildFromTemplate([
                    {
                        label: 'Close',
                        click: () => {
                            window.dispatchEvent(new CustomEvent('onCloseWorkspace', { detail: $this.id }));
                        }
                    },
                    {
                        label: 'Close All',
                        click: () => {
                            window.dispatchEvent(new CustomEvent('onCloseAllWorkspaces', { detail: $this.id }));
                        }
                    },
                    {
                        label: 'Close Other',
                        click: () => {
                            window.dispatchEvent(new CustomEvent('onCloseOtherWorkspaces', { detail: $this.id }));
                        }
                    },
                    {
                        label: 'Close Saved',
                        click: () => {
                            window.dispatchEvent(new CustomEvent('onCloseSavedWorkspaces', { detail: $this.id }));
                        }
                    },
                    {
                        label: 'Close Dirty',
                        click: () => {
                            window.dispatchEvent(new CustomEvent('onCloseDirtyWorkspaces', { detail: $this.id }));
                        }
                    }
                ]).popup();
            }
        });
        workspaceTab.querySelector('span:last-child').addEventListener('click', (e) => {
            e.stopPropagation();
            window.dispatchEvent(new CustomEvent('onCloseWorkspace', { detail: $this.id }));
        });

        // Create the workspace transparent canvas
        this.canvasTrans = document.createElement('canvas') as HTMLCanvasElement;
        this.canvasTrans.width = this.width * this.scale;
        this.canvasTrans.height = this.height * this.scale;
        this.canvasTrans.classList.add('transparent');
        this.setTransImage(this.canvasTrans);

        // Create the workspace master canvas
        this.canvas = document.createElement('canvas') as HTMLCanvasElement;
        this.drawWorkspace();

        // Add the canvases to the workspace
        workspaceArea.appendChild(this.canvasTrans);
        workspaceArea.appendChild(this.canvas);
    }

    public get id(): string {
        return this._id;
    }

    public get title(): string {
        return this._title;
    }

    public get isDirty(): boolean {
        return this._isDirty;
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public get layers(): Manager<Layer> {
        return this._layers;
    }

    public drawWorkspace() {
        let context: CanvasRenderingContext2D = this.canvas.getContext('2d');
        this.canvas.classList.add('main');
        this.canvas.width = this.width * this.scale;
        this.canvas.height = this.height * this.scale;
        context.scale(this.scale, this.scale);
        if (this.layers.length > 0) {
            this.layers.forEach(layer => {
                if (layer.isVisible) {
                    context.drawImage(layer.getImage(), 0, 0);
                }
            });
        }
    }

    public setImage(filepath: string): Promise<boolean> {
        return new Promise(resolve => {
            var image = new Image();
            image.src = filepath;
            let $this = this;
            image.onload = function () {
                $this._width = image.width;
                $this._height = image.height;
                $this.layers.add(new Layer('Background', image));
                resolve(true);
            }
        });
    }

    public scaleCanvas(scale: number) {
        this.scale = scale;
        this.canvas.width = this.width * this.scale;
        this.canvas.height = this.height * this.scale;

        if (this.layers.length > 0) {
            let context = this.canvas.getContext('2d');
            context.scale(this.scale, this.scale);
            this.layers.forEach(layer => {
                context.drawImage(layer.getImage(), 0, 0);
            });
        }

        this.canvasTrans.width = this.width * this.scale;
        this.canvasTrans.height = this.height * this.scale;
        this.setTransImage(this.canvasTrans);
    }

    public setTransImage(canvas: HTMLCanvasElement): void {
        let img = new Image();
        img.src = '../../resources/images/transparent.png';
        img.onload = () => {
            let context: CanvasRenderingContext2D = canvas.getContext('2d');
            let pattern = context.createPattern(img, 'repeat');
            context.fillStyle = pattern;
            context.fillRect(0, 0, canvas.width, canvas.height);
        }
    }

    public setupLayers(layersElement: HTMLElement) {
        this.layers.forEach(layer => {
            let palletLayer = document.createElement('div') as HTMLDivElement;
            let visibleDivElement = document.createElement('div') as HTMLDivElement;
            let canvasDivElement = document.createElement('div') as HTMLDivElement;
            let textDivElement = document.createElement('div') as HTMLDivElement;
            let thumbCanvasElement = document.createElement('canvas') as HTMLCanvasElement;
            let eyeIconElement = document.createElement('i') as HTMLElement;


            palletLayer.classList.add('layers-layer')

            textDivElement.innerText = layer.title;
            textDivElement.addEventListener('dblclick', e => {
                alert('double clicked');
            });

            let width = 40 * globals.activeWorkspace.width / globals.activeWorkspace.height;
            let height = 40;
            if (width > 60) {
                height = 60 * globals.activeWorkspace.height / globals.activeWorkspace.width;
                width = 60;
            }
            thumbCanvasElement.width = width;
            thumbCanvasElement.height = height;

            let context = thumbCanvasElement.getContext('2d');
            context.drawImage(layer.getImage(), 0, 0, layer.width, layer.height, 0, 0, width, height);

            eyeIconElement.classList.add('fa');
            if (layer.isVisible) {
                eyeIconElement.classList.add('fa-eye');
            } else {
                eyeIconElement.classList.add('fa-eye-slash');
            }
            eyeIconElement.classList.add('toggle-visiblity');
            eyeIconElement.addEventListener('click', e => {
                window.dispatchEvent(new CustomEvent('onLayerVisibilityChange', {detail: {id: layer.id, element: eyeIconElement}}));
                window.dispatchEvent(new CustomEvent('onWorkspaceChange', {detail: this.id}));
            });

            visibleDivElement.appendChild(eyeIconElement);
            canvasDivElement.appendChild(thumbCanvasElement);
            canvasDivElement.classList.add('preview');

            // Add to the layer pallet
            palletLayer.appendChild(visibleDivElement);
            palletLayer.appendChild(canvasDivElement);
            palletLayer.appendChild(textDivElement);

            layersElement.appendChild(palletLayer);
        });
    }

    public pasteToLayer(/*image: Electron.NativeImage*/): Promise<Layer> {
        // var layer = new Layer('Untitled');
        // var size = image.getSize();
        // layer.setPixelData(image.toPNG(), size.width, size.height);
        // this.layers.add(layer);
        // window.dispatchEvent(new CustomEvent('onWorkspaceChange', { detail: this.id }));
        return new Promise(resolve => {
            var fk = cp.fork('./client/processes/getClipboardImage.js',[],{cwd: __dirname + '/../../'});
            fk.on('got-string', (err, out) => {
                if (err) {
                    throw err;
                }
                let img = new Image();
                console.time('toString');
                img.src = out;
                console.timeEnd('toString');
                img.onload = () => {
                    var layer = new Layer('Untitled', img);
                    this.layers.add(layer);
                    resolve(layer);
                    window.dispatchEvent(new CustomEvent('onWorkspaceChange', { detail: this.id }));
                }
            });
        });
    }

}