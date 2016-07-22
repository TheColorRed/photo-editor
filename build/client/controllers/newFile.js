"use strict";
const { remote } = require('electron');
const Input_1 = require('../../client/utils/Input');
var ipc = remote.ipcMain;
var numberInputs = document.querySelectorAll('input.number');
for (var i = 0; i < numberInputs.length; i++) {
    Input_1.Input.numeric(numberInputs[i]);
}
