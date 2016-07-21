"use strict";
var Manager = (function () {
    function Manager() {
        this._items = [];
    }
    Object.defineProperty(Manager.prototype, "items", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    Manager.prototype.add = function (item) {
        if (!this.contains(item)) {
            this._items.push(item);
        }
        return this;
    };
    Manager.prototype.remove = function (item) {
        if (this.contains(item)) {
            this._items.splice(this._items.indexOf(item), 1);
        }
        return this;
    };
    Manager.prototype.contains = function (item) {
        return this._items.indexOf(item) > -1 ? true : false;
    };
    return Manager;
}());
exports.Manager = Manager;
