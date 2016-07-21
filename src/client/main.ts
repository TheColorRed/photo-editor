import { Canvas } from './utils/Canvas';
import { Layers } from './utils/Layers';
import { Manager } from './managers/Manager';

// window['canvas'] = new Canvas().init();

let canvases: Manager<Canvas> = new Manager<Canvas>();

canvases.add(new Canvas('one', 100, 100));
canvases.add(new Canvas('two', 200, 200));
canvases.add(new Canvas('three', 300, 300));

canvases.items.forEach(canvas => {
    canvas.createTab();
});

// window['layers'] = new Layers().init(layers);
