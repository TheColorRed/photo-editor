"use strict";
class Input {
    static numeric(item) {
        item.addEventListener('keypress', (e) => {
            if ((e.keyCode < 48 || e.keyCode > 57) && e.keyCode != 46) {
                e.preventDefault();
            }
        });
    }
}
exports.Input = Input;
