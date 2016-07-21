"use strict";
(function (BlendType) {
    BlendType[BlendType["Normal"] = 0] = "Normal";
    BlendType[BlendType["Lighten"] = 1] = "Lighten";
    BlendType[BlendType["Darken"] = 2] = "Darken";
    BlendType[BlendType["Multiply"] = 3] = "Multiply";
    BlendType[BlendType["Average"] = 4] = "Average";
    BlendType[BlendType["Add"] = 5] = "Add";
    BlendType[BlendType["Subtract"] = 6] = "Subtract";
    BlendType[BlendType["Difference"] = 7] = "Difference";
    BlendType[BlendType["Negation"] = 8] = "Negation";
    BlendType[BlendType["Screen"] = 9] = "Screen";
    BlendType[BlendType["Exclusion"] = 10] = "Exclusion";
    BlendType[BlendType["Overlay"] = 11] = "Overlay";
    BlendType[BlendType["SoftLight"] = 12] = "SoftLight";
    BlendType[BlendType["HardLight"] = 13] = "HardLight";
    BlendType[BlendType["ColorDodge"] = 14] = "ColorDodge";
    BlendType[BlendType["ColorBurn"] = 15] = "ColorBurn";
    BlendType[BlendType["LinearDodge"] = 16] = "LinearDodge";
    BlendType[BlendType["LinearBurn"] = 17] = "LinearBurn";
    BlendType[BlendType["LinearLight"] = 18] = "LinearLight";
    BlendType[BlendType["VividLight"] = 19] = "VividLight";
    BlendType[BlendType["PinLight"] = 20] = "PinLight";
    BlendType[BlendType["HardMix"] = 21] = "HardMix";
    BlendType[BlendType["Reflect"] = 22] = "Reflect";
    BlendType[BlendType["Glow"] = 23] = "Glow";
    BlendType[BlendType["Phoenix"] = 24] = "Phoenix";
})(exports.BlendType || (exports.BlendType = {}));
var BlendType = exports.BlendType;
var Blend = (function () {
    function Blend() {
    }
    Blend.normal = function (a, b) {
        return a;
    };
    Blend.lighten = function (a, b) {
        return (b > a) ? b : a;
    };
    Blend.darken = function (a, b) {
        return (b > a) ? a : b;
    };
    Blend.multiply = function (a, b) {
        return (a * b) / 255;
    };
    Blend.average = function (a, b) {
        return (a + b) / 2;
    };
    Blend.add = function (a, b) {
        return Math.min(255, (a + b));
    };
    Blend.subtract = function (a, b) {
        return (a + b < 255) ? 0 : (a + b - 255);
    };
    Blend.difference = function (a, b) {
        return Math.abs(a - b);
    };
    Blend.negation = function (a, b) {
        return (255 - Math.abs(255 - a - b));
    };
    Blend.screen = function (a, b) {
        return (255 - (((255 - a) * (255 - b)) >> 8));
    };
    Blend.exclusion = function (a, b) {
        return a + b - 2 * a * b / 255;
    };
    Blend.overlay = function (a, b) {
        return (b < 128) ? (2 * a * b / 255) : (255 - 2 * (255 - a) * (255 - b) / 255);
    };
    Blend.softLight = function (a, b) {
        return ((b < 128) ? (2 * ((a >> 1) + 64)) * (b / 255) : (255 - (2 * (255 - ((a >> 1) + 64)) * (255 - b) / 255)));
    };
    Blend.hardLight = function (a, b) {
        return this.overlay(b, a);
    };
    Blend.colorDodge = function (a, b) {
        return ((b == 255) ? b : Math.min(255, ((a << 8) / (255 - b))));
    };
    Blend.colorBurn = function (a, b) {
        return ((b == 0) ? b : Math.max(0, (255 - ((255 - a) << 8) / b)));
    };
    Blend.linearDodge = function (a, b) {
        return this.add(a, b);
    };
    Blend.linearBurn = function (a, b) {
        return this.subtract(a, b);
    };
    Blend.linearLight = function (a, b) {
        return (b < 128) ? this.linearBurn(a, (2 * b)) : this.linearDodge(a, (2 * (b - 128)));
    };
    Blend.vividLight = function (a, b) {
        return (b < 128) ? this.colorBurn(a, (2 * b)) : this.colorDodge(a, (2 * (b - 128)));
    };
    Blend.pinLight = function (a, b) {
        return (b < 128) ? this.darken(a, (2 * b)) : this.lighten(a, (2 * (b - 128)));
    };
    Blend.hardMix = function (a, b) {
        return ((this.vividLight(a, b) < 128) ? 0 : 255);
    };
    Blend.reflect = function (a, b) {
        return ((b == 255) ? b : Math.min(255, (a * a / (255 - b))));
    };
    Blend.glow = function (a, b) {
        return this.reflect(b, a);
    };
    Blend.phoenix = function (a, b) {
        return (Math.min(a, b) - Math.max(a, b) + 255);
    };
    return Blend;
}());
exports.Blend = Blend;
