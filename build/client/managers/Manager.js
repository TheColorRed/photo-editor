"use strict";
class Manager {
    constructor() {
        this._items = [];
    }
    get items() {
        return this._items;
    }
    add(item) {
        if (!this.contains(item)) {
            this._items.push(item);
        }
        return this;
    }
    remove(item) {
        if (this.contains(item)) {
            this._items.splice(this._items.indexOf(item), 1);
        }
        return this;
    }
    contains(item) {
        return this._items.indexOf(item) > -1 ? true : false;
    }
}
exports.Manager = Manager;
