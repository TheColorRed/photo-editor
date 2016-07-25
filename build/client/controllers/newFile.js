"use strict";
const { ipcRenderer, clipboard } = require('electron');
const Input_1 = require('../../client/utils/Input');
var numberInputs = document.querySelectorAll('input.number');
for (var i = 0; i < numberInputs.length; i++) {
    Input_1.Input.numeric(numberInputs[i]);
}
var width = document.querySelector('#width');
var height = document.querySelector('#height');
var title = document.querySelector('#workspace-name');
var ok = document.querySelector('#ok');
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
