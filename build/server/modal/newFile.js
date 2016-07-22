"use strict";
const Window_1 = require('../managers/Window');
var fileManager = new Window_1.WindowManager();
fileManager.createWindow({
    fileName: `${__dirname}/../../client/resources/views/index.html`,
    windowSettings: {
        height: 500,
        width: 500
    }
});
