"use strict";
const shortid = require('shortid');
const buffer = require('buffer');
class Layer {
    constructor(title, image) {
        this.isVisible = true;
        this._image = image;
        this._title = title || '';
        this._canvas = document.createElement('canvas');
        if (image) {
            this._canvas.width = image.width;
            this._canvas.height = image.height;
            this._canvas.getContext('2d').drawImage(image, 0, 0);
        }
        this._id = shortid.generate();
        let $this = this;
        window.addEventListener('onLayerVisibilityChange', (event) => {
            if (event.detail.id == $this.id) {
                $this.isVisible = !$this.isVisible;
                if ($this.isVisible) {
                    event.detail.element.classList.remove('fa-eye-slash');
                    event.detail.element.classList.add('fa-eye');
                }
                else {
                    event.detail.element.classList.remove('fa-eye');
                    event.detail.element.classList.add('fa-eye-slash');
                }
            }
        });
    }
    get id() {
        return this._id;
    }
    get title() {
        return this._title;
    }
    get width() {
        return this._canvas.width;
    }
    get height() {
        return this._canvas.height;
    }
    get canvas() {
        return this._canvas;
    }
    getImage() {
        return this._canvas;
    }
    setPixelData(data, width, height) {
        var clamped = new Uint8ClampedArray(width * height * 4);
        var imageData = new ImageData(clamped, width, height);
        this.canvas.getContext('2d').putImageData(imageData, 0, 0);
    }
}
exports.Layer = Layer;
