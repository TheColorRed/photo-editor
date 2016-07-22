const { remote } = require('electron');
import { Input } from '../../client/utils/Input';

var ipc = remote.ipcMain;

// Lock items to numbers only
var numberInputs = document.querySelectorAll('input.number') as NodeListOf<HTMLElement>;
for (var i = 0; i < numberInputs.length; i++){
    Input.numeric(numberInputs[i]);
}