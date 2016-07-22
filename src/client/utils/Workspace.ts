import { Manager } from '../managers/Manager';
import { Layer } from './Layer';

const shortid = require('shortid');

export class Workspace {

    public scale: number = 0.5;

    protected _title: string = '';
    protected _id: string;

    protected _isDirty: boolean = false;

    protected _width: number = 	1;
    protected _height: number = 1;

    protected _image: HTMLImageElement;

	protected _layers: Manager<Layer> = new Manager<Layer>();

    public constructor(title: string, width?: number, height?: number) {
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

    public get hasImage(): boolean {
        if (this._image) {
            return true;
        }
        return false;
    }

    public get image(): HTMLImageElement {
        return this._image;
    }

    public setImage(path: string): Promise<boolean> {
        return new Promise(resolve => {
            this._image = new Image();
            this._image.src = path;
            let $this = this;
            this._image.onload = function () {
                $this._width = $this._image.width;
                $this._height = $this._image.height;
                resolve(true);
            }
        });
    }

}