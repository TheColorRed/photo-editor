"use strict";
class Manager {
    constructor() {
        this._items = [];
    }
    get items() {
        return this._items;
    }
    get length() {
        return this._items.length;
    }
    forEach(callback) {
        this._items.forEach(item => {
            callback(item);
        });
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
    getByKey(key, value) {
        for (let i in this._items) {
            let item = this._items[i];
            console.log(item[key]);
            if (item[key] == value) {
                return item;
            }
        }
        return null;
    }
}
exports.Manager = Manager;
