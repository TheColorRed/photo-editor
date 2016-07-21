import electron = require('electron');
import { Input } from '../utils/Input';

var remote = electron.remote;
var ipc = remote.ipcMain;

var numberInputs = document.querySelectorAll('input.number') as NodeListOf<HTMLElement>;

for (var i = 0; i < numberInputs.length; i++){
    Input.numeric(numberInputs[i]);
}