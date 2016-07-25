export class Manager<T> {

    protected _items: T[] = [];

    public get items(): T[] {
        return this._items;
    }

    public get length(): number {
        return this._items.length;
    }

    public forEach(callback: (value: T) => void): void {
        this._items.forEach(item => {
            callback(item);
        });
    }

    public add(item: T): this {
        if (!this.contains(item)) {
            this._items.push(item);
        }
        return this;
    }

    public remove(item: T): this {
        if (this.contains(item)) {
            this._items.splice(this._items.indexOf(item), 1);
        }
        return this;
    }

    public contains(item: T): boolean {
        return this._items.indexOf(item) > -1 ? true : false;
    }

    public getByKey(key: string, value: any): T {
        for (let i in this._items) {
            let item = this._items[i];
            console.log(item[key])
            if (item[key] == value) {
                return item;
            }
        }
        return null;
    }

}