import { clipboard } from 'electron';
var base64Image = clipboard.readImage().toDataURL();
process.emit('got-string', base64Image);