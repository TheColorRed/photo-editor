"use strict";
var Manager_1 = require('../managers/Manager');
var shortid = require('shortid');
var Workspace = (function () {
    function Workspace(title, width, height) {
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
    Object.defineProperty(Workspace.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Workspace.prototype, "title", {
        get: function () {
            return this._title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Workspace.prototype, "isDirty", {
        get: function () {
            return this._isDirty;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Workspace.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Workspace.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Workspace.prototype, "layers", {
        get: function () {
            return this._layers;
        },
        enumerable: true,
        configurable: true
    });
    return Workspace;
}());
exports.Workspace = Workspace;
