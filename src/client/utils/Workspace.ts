import { Manager } from '../managers/Manager';
import { Layer } from './Layer';

const shortid = require('shortid');

export class Workspace {

    protected _title: string = '';
    protected _id: string;

    protected _isDirty: boolean = false;

    protected _width: number = 	1;
    protected _height: number = 1;

	protected _layers: Manager<Layer> = new Manager<Layer>();

    public constructor(title: string, width: number, height: number) {
        this._title = title;
        this._width = width;
        this._height = height;
        this._id = shortid.generate();
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

}