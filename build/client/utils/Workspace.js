"use strict";
const Manager_1 = require('../managers/Manager');
const shortid = require('shortid');
class Workspace {
    constructor(title, width, height) {
        this.scale = 0.5;
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
    get hasImage() {
        if (this._image) {
            return true;
        }
        return false;
    }
    get image() {
        return this._image;
    }
    setImage(path) {
        return new Promise(resolve => {
            this._image = new Image();
            this._image.src = path;
            let $this = this;
            this._image.onload = function () {
                $this._width = $this._image.width;
                $this._height = $this._image.height;
                resolve(true);
            };
        });
    }
}
exports.Workspace = Workspace;
