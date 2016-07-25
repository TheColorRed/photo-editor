"use strict";
const electron_1 = require('electron');
var base64Image = electron_1.clipboard.readImage().toDataURL();
process.emit('got-string', base64Image);
