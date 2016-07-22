"use strict";
const electron = require('electron');
const Input_1 = require('../../client/utils/Input');
var remote = electron.remote;
var ipc = remote.ipcMain;
var numberInputs = document.querySelectorAll('input.number');
for (var i = 0; i < numberInputs.length; i++) {
    Input_1.Input.numeric(numberInputs[i]);
}
