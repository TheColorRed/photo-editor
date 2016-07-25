const shortid = require('shortid');
const buffer = require('buffer');

export class Layer {

    protected _canvas: HTMLCanvasElement;
    protected _image: HTMLImageElement;
    protected _title: string;
    protected _id: string;

    public isVisible: boolean = true;

    public constructor(title?: string, image?: HTMLImageElement) {
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
        window.addEventListener('onLayerVisibilityChange', (event: CustomEvent) => {
            if (event.detail.id == $this.id) {
                $this.isVisible = !$this.isVisible;
                if ($this.isVisible) {
                    event.detail.element.classList.remove('fa-eye-slash');
                    event.detail.element.classList.add('fa-eye');
                } else {
                    event.detail.element.classList.remove('fa-eye');
                    event.detail.element.classList.add('fa-eye-slash');
                }
            }
        });
    }

    public get id(): string {
        return this._id;
    }

    public get title(): string {
        return this._title;
    }

    public get width(): number {
        return this._canvas.width;
    }

    public get height(): number {
        return this._canvas.height;
    }

    public get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    public getImage(): HTMLCanvasElement {
        return this._canvas;
    }

    public setPixelData(data: Buffer, width: number, height: number) {
        var clamped = new Uint8ClampedArray(width * height * 4);
        // var imgbin = data.toString();
        var imageData = new ImageData(clamped, width, height);
        this.canvas.getContext('2d').putImageData(imageData, 0, 0);
    }

}