"use strict";
const Manager_1 = require('../managers/Manager');
const WorkspaceController_1 = require('../../client/controllers/WorkspaceController');
const Layer_1 = require('./Layer');
const global_1 = require('../../client/utils/global');
const { remote } = require('electron');
const cp = require('child_process');
let Menu = remote.Menu;
const tabMenu = require('../../client/menus/workspaceTab');
const shortid = require('shortid');
class Workspace {
    constructor(title, width, height) {
        this.scale = 1;
        this._title = '';
        this._isDirty = false;
        this._width = 1;
        this._height = 1;
        this._layers = new Manager_1.Manager();
        this._title = title;
        this._width = width;
        this._height = height;
        this._id = shortid.generate();
    }
    init(workspaceTab, workspaceArea) {
        var $this = this;
        workspaceTab.addEventListener('mousedown', (e) => {
            let target = e.currentTarget;
            if (e.which == 1) {
                WorkspaceController_1.WorkspaceController.focusWorkspace($this.id);
            }
            else if (e.which == 2) {
                WorkspaceController_1.WorkspaceController.removeWorkspace($this.id);
                window.dispatchEvent(new CustomEvent('onWorkspaceChange', { detail: $this.id }));
            }
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
        this.canvasTrans = document.createElement('canvas');
        this.canvasTrans.width = this.width * this.scale;
        this.canvasTrans.height = this.height * this.scale;
        this.canvasTrans.classList.add('transparent');
        this.setTransImage(this.canvasTrans);
        this.canvas = document.createElement('canvas');
        this.drawWorkspace();
        workspaceArea.appendChild(this.canvasTrans);
        workspaceArea.appendChild(this.canvas);
    }
    get id() {
        return this._id;
    }
    get title() {
        return this._title;
    }
    get isDirty() {
        return this._isDirty;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    get layers() {
        return this._layers;
    }
    drawWorkspace() {
        let context = this.canvas.getContext('2d');
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
    setImage(filepath) {
        return new Promise(resolve => {
            var image = new Image();
            image.src = filepath;
            let $this = this;
            image.onload = function () {
                $this._width = image.width;
                $this._height = image.height;
                $this.layers.add(new Layer_1.Layer('Background', image));
                resolve(true);
            };
        });
    }
    scaleCanvas(scale) {
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
    setupLayers(layersElement) {
        this.layers.forEach(layer => {
            let palletLayer = document.createElement('div');
            let visibleDivElement = document.createElement('div');
            let canvasDivElement = document.createElement('div');
            let textDivElement = document.createElement('div');
            let thumbCanvasElement = document.createElement('canvas');
            let eyeIconElement = document.createElement('i');
            palletLayer.classList.add('layers-layer');
            textDivElement.innerText = layer.title;
            textDivElement.addEventListener('dblclick', e => {
                alert('double clicked');
            });
            let width = 40 * global_1.globals.activeWorkspace.width / global_1.globals.activeWorkspace.height;
            let height = 40;
            if (width > 60) {
                height = 60 * global_1.globals.activeWorkspace.height / global_1.globals.activeWorkspace.width;
                width = 60;
            }
            thumbCanvasElement.width = width;
            thumbCanvasElement.height = height;
            let context = thumbCanvasElement.getContext('2d');
            context.drawImage(layer.getImage(), 0, 0, layer.width, layer.height, 0, 0, width, height);
            eyeIconElement.classList.add('fa');
            if (layer.isVisible) {
                eyeIconElement.classList.add('fa-eye');
            }
            else {
                eyeIconElement.classList.add('fa-eye-slash');
            }
            eyeIconElement.classList.add('toggle-visiblity');
            eyeIconElement.addEventListener('click', e => {
                window.dispatchEvent(new CustomEvent('onLayerVisibilityChange', { detail: { id: layer.id, element: eyeIconElement } }));
                window.dispatchEvent(new CustomEvent('onWorkspaceChange', { detail: this.id }));
            });
            visibleDivElement.appendChild(eyeIconElement);
            canvasDivElement.appendChild(thumbCanvasElement);
            canvasDivElement.classList.add('preview');
            palletLayer.appendChild(visibleDivElement);
            palletLayer.appendChild(canvasDivElement);
            palletLayer.appendChild(textDivElement);
            layersElement.appendChild(palletLayer);
        });
    }
    pasteToLayer() {
        return new Promise(resolve => {
            var fk = cp.fork('./build/client/processes/getClipboardImage.js', [], { cwd: __dirname + '/../../../' });
            fk.on('got-string', (err, out) => {
                if (err) {
                    throw err;
                }
                let img = new Image();
                console.time('toString');
                img.src = out;
                console.timeEnd('toString');
                img.onload = () => {
                    var layer = new Layer_1.Layer('Untitled', img);
                    this.layers.add(layer);
                    resolve(layer);
                    window.dispatchEvent(new CustomEvent('onWorkspaceChange', { detail: this.id }));
                };
            });
        });
    }
}
exports.Workspace = Workspace;
