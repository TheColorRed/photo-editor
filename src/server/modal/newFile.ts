
import electron = require('electron');
import { WindowManager } from '../managers/Window';

var fileManager = new WindowManager();

fileManager.createWindow({
    fileName: `${__dirname}/../../client/resources/views/index.html`,
    windowSettings: {
        height: 500,
        width: 500
    }
});