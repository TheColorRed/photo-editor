"use strict";
var Input = (function () {
    function Input() {
    }
    Input.numeric = function (item) {
        item.addEventListener('keypress', function (e) {
            if ((e.keyCode < 48 || e.keyCode > 57) && e.keyCode != 46) {
                e.preventDefault();
            }
        });
    };
    return Input;
}());
exports.Input = Input;
