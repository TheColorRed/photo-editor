const { ipcRenderer, clipboard } = require('electron');
import { Input } from '../../client/utils/Input';

// Lock items to numbers only
var numberInputs = document.querySelectorAll('input.number') as NodeListOf<HTMLInputElement>;
for (var i = 0; i < numberInputs.length; i++){
    Input.numeric(numberInputs[i]);
}

var width: HTMLInputElement = document.querySelector('#width') as HTMLInputElement;
var height: HTMLInputElement = document.querySelector('#height') as HTMLInputElement;
var title: HTMLInputElement = document.querySelector('#workspace-name') as HTMLInputElement;

var ok = document.querySelector('#ok') as HTMLButtonElement;
ok.addEventListener('click', e => {
    ipcRenderer.send('new-file-create', {
        title: title.value,
        width: parseInt(width.value),
        height: parseInt(height.value)
    });
});

let clipboardImage = clipboard.readImage();
if (!clipboardImage.isEmpty()) {
    width.value = clipboardImage.getSize().width.toString();
    height.value = clipboardImage.getSize().height.toString();
}