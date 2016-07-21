export class Manager<T> {

    protected _items: T[] = [];

    public get items(): T[] {
        return this._items;
    }

    public add(item: T): this {
        if (!this.contains(item)) {
            this._items.push(item);
        }
        return this;
    }

    public remove(item: T): this {
        if (this.contains(item)) {
            this._items.slice(this._items.indexOf(item), 1);
        }
        return this;
    }

    public contains(item: T): boolean {
        return this._items.indexOf(item) > -1 ? true : false;
    }

}