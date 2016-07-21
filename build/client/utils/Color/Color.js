"use strict";
var Blend_1 = require('./Blend');
var Color = (function () {
    function Color(r, g, b, a) {
        if (a === void 0) { a = 255; }
        if (typeof r == 'string') {
            var c = Color.rgb(r);
            this.r = c.r;
            this.g = c.g;
            this.b = c.b;
            this.a = c.a;
        }
        else {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
    }
    Color.prototype.hex = function () {
        var hexr = this.r.toString(16);
        var hexg = this.g.toString(16);
        var hexb = this.b.toString(16);
        var r = hexr.length == 1 ? "0" + hexr : hexr;
        var g = hexg.length == 1 ? "0" + hexg : hexg;
        var b = hexb.length == 1 ? "0" + hexb : hexb;
        return r + g + b;
    };
    Color.rgb = function (hex) {
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return new Color(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16));
    };
    Color.prototype.blend = function (color, blendType) {
        return Color.blend(this, color, blendType);
    };
    Color.blend = function (color1, color2, blendType) {
        var r, g, b, a;
        switch (blendType) {
            case Blend_1.BlendType.Normal:
                r = Blend_1.Blend.normal(color1.r, color2.r);
                g = Blend_1.Blend.normal(color1.g, color2.g);
                b = Blend_1.Blend.normal(color1.b, color2.b);
                a = Blend_1.Blend.normal(color1.a, color2.a);
                break;
            case Blend_1.BlendType.Lighten:
                r = Blend_1.Blend.lighten(color1.r, color2.r);
                g = Blend_1.Blend.lighten(color1.g, color2.g);
                b = Blend_1.Blend.lighten(color1.b, color2.b);
                a = Blend_1.Blend.lighten(color1.a, color2.a);
                break;
            case Blend_1.BlendType.Darken:
                r = Blend_1.Blend.darken(color1.r, color2.r);
                g = Blend_1.Blend.darken(color1.g, color2.g);
                b = Blend_1.Blend.darken(color1.b, color2.b);
                a = Blend_1.Blend.darken(color1.a, color2.a);
                break;
            case Blend_1.BlendType.Multiply:
                r = Blend_1.Blend.multiply(color1.r, color2.r);
                g = Blend_1.Blend.multiply(color1.g, color2.g);
                b = Blend_1.Blend.multiply(color1.b, color2.b);
                a = Blend_1.Blend.multiply(color1.a, color2.a);
                break;
            case Blend_1.BlendType.Average:
                r = Blend_1.Blend.average(color1.r, color2.r);
                g = Blend_1.Blend.average(color1.g, color2.g);
                b = Blend_1.Blend.average(color1.b, color2.b);
                a = Blend_1.Blend.average(color1.a, color2.a);
                break;
            case Blend_1.BlendType.Add:
                r = Blend_1.Blend.add(color1.r, color2.r);
                g = Blend_1.Blend.add(color1.g, color2.g);
                b = Blend_1.Blend.add(color1.b, color2.b);
                a = Blend_1.Blend.add(color1.a, color2.a);
                break;
            case Blend_1.BlendType.Subtract:
                r = Blend_1.Blend.subtract(color1.r, color2.r);
                g = Blend_1.Blend.subtract(color1.g, color2.g);
                b = Blend_1.Blend.subtract(color1.b, color2.b);
                a = Blend_1.Blend.subtract(color1.a, color2.a);
                break;
            case Blend_1.BlendType.Difference:
                r = Blend_1.Blend.difference(color1.r, color2.r);
                g = Blend_1.Blend.difference(color1.g, color2.g);
                b = Blend_1.Blend.difference(color1.b, color2.b);
                a = Blend_1.Blend.difference(color1.a, color2.a);
                break;
            case Blend_1.BlendType.Negation:
                r = Blend_1.Blend.negation(color1.r, color2.r);
                g = Blend_1.Blend.negation(color1.g, color2.g);
                b = Blend_1.Blend.negation(color1.b, color2.b);
                a = Blend_1.Blend.negation(color1.a, color2.a);
                break;
            case Blend_1.BlendType.Screen:
                r = Blend_1.Blend.screen(color1.r, color2.r);
                g = Blend_1.Blend.screen(color1.g, color2.g);
                b = Blend_1.Blend.screen(color1.b, color2.b);
                a = Blend_1.Blend.screen(color1.a, color2.a);
                break;
            case Blend_1.BlendType.Exclusion:
                r = Blend_1.Blend.exclusion(color1.r, color2.r);
                g = Blend_1.Blend.exclusion(color1.g, color2.g);
                b = Blend_1.Blend.exclusion(color1.b, color2.b);
                a = Blend_1.Blend.exclusion(color1.a, color2.a);
                break;
            case Blend_1.BlendType.Overlay:
                r = Blend_1.Blend.overlay(color1.r, color2.r);
                g = Blend_1.Blend.overlay(color1.g, color2.g);
                b = Blend_1.Blend.overlay(color1.b, color2.b);
                a = Blend_1.Blend.overlay(color1.a, color2.a);
                break;
            case Blend_1.BlendType.SoftLight:
                r = Blend_1.Blend.softLight(color1.r, color2.r);
                g = Blend_1.Blend.softLight(color1.g, color2.g);
                b = Blend_1.Blend.softLight(color1.b, color2.b);
                a = Blend_1.Blend.softLight(color1.a, color2.a);
                break;
            case Blend_1.BlendType.HardLight:
                r = Blend_1.Blend.hardLight(color1.r, color2.r);
                g = Blend_1.Blend.hardLight(color1.g, color2.g);
                b = Blend_1.Blend.hardLight(color1.b, color2.b);
                a = Blend_1.Blend.hardLight(color1.a, color2.a);
                break;
            case Blend_1.BlendType.ColorDodge:
                r = Blend_1.Blend.colorDodge(color1.r, color2.r);
                g = Blend_1.Blend.colorDodge(color1.g, color2.g);
                b = Blend_1.Blend.colorDodge(color1.b, color2.b);
                a = Blend_1.Blend.colorDodge(color1.a, color2.a);
                break;
            case Blend_1.BlendType.ColorBurn:
                r = Blend_1.Blend.colorBurn(color1.r, color2.r);
                g = Blend_1.Blend.colorBurn(color1.g, color2.g);
                b = Blend_1.Blend.colorBurn(color1.b, color2.b);
                a = Blend_1.Blend.colorBurn(color1.a, color2.a);
                break;
            case Blend_1.BlendType.LinearDodge:
                r = Blend_1.Blend.linearDodge(color1.r, color2.r);
                g = Blend_1.Blend.linearDodge(color1.g, color2.g);
                b = Blend_1.Blend.linearDodge(color1.b, color2.b);
                a = Blend_1.Blend.linearDodge(color1.a, color2.a);
                break;
            case Blend_1.BlendType.LinearBurn:
                r = Blend_1.Blend.linearBurn(color1.r, color2.r);
                g = Blend_1.Blend.linearBurn(color1.g, color2.g);
                b = Blend_1.Blend.linearBurn(color1.b, color2.b);
                a = Blend_1.Blend.linearBurn(color1.a, color2.a);
                break;
            case Blend_1.BlendType.LinearLight:
                r = Blend_1.Blend.linearLight(color1.r, color2.r);
                g = Blend_1.Blend.linearLight(color1.g, color2.g);
                b = Blend_1.Blend.linearLight(color1.b, color2.b);
                a = Blend_1.Blend.linearLight(color1.a, color2.a);
                break;
            case Blend_1.BlendType.VividLight:
                r = Blend_1.Blend.vividLight(color1.r, color2.r);
                g = Blend_1.Blend.vividLight(color1.g, color2.g);
                b = Blend_1.Blend.vividLight(color1.b, color2.b);
                a = Blend_1.Blend.vividLight(color1.a, color2.a);
                break;
            case Blend_1.BlendType.PinLight:
                r = Blend_1.Blend.pinLight(color1.r, color2.r);
                g = Blend_1.Blend.pinLight(color1.g, color2.g);
                b = Blend_1.Blend.pinLight(color1.b, color2.b);
                a = Blend_1.Blend.pinLight(color1.a, color2.a);
                break;
            case Blend_1.BlendType.HardMix:
                r = Blend_1.Blend.hardMix(color1.r, color2.r);
                g = Blend_1.Blend.hardMix(color1.g, color2.g);
                b = Blend_1.Blend.hardMix(color1.b, color2.b);
                a = Blend_1.Blend.hardMix(color1.a, color2.a);
                break;
            case Blend_1.BlendType.Reflect:
                r = Blend_1.Blend.reflect(color1.r, color2.r);
                g = Blend_1.Blend.reflect(color1.g, color2.g);
                b = Blend_1.Blend.reflect(color1.b, color2.b);
                a = Blend_1.Blend.reflect(color1.a, color2.a);
                break;
            case Blend_1.BlendType.Glow:
                r = Blend_1.Blend.glow(color1.r, color2.r);
                g = Blend_1.Blend.glow(color1.g, color2.g);
                b = Blend_1.Blend.glow(color1.b, color2.b);
                a = Blend_1.Blend.glow(color1.a, color2.a);
                break;
            case Blend_1.BlendType.Phoenix:
                r = Blend_1.Blend.phoenix(color1.r, color2.r);
                g = Blend_1.Blend.phoenix(color1.g, color2.g);
                b = Blend_1.Blend.phoenix(color1.b, color2.b);
                a = Blend_1.Blend.phoenix(color1.a, color2.a);
                break;
        }
        return new Color(r, g, b, a);
    };
    Object.defineProperty(Color.prototype, "invert", {
        get: function () {
            var r = Math.abs(this.r - 255);
            var g = Math.abs(this.g - 255);
            var b = Math.abs(this.b - 255);
            return new Color(r, g, b);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "luminance", {
        get: function () {
            return 0.2126 * this.r + 0.7152 * this.g + 0.0722 * this.b;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "grayscale", {
        get: function () {
            return (this.r + this.g + this.b) / 3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "maxColorComponent", {
        get: function () {
            return Math.max(this.r, this.g, this.b);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "indianRed", {
        get: function () { return new Color(205, 92, 92); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "lightCoral", {
        get: function () { return new Color(240, 128, 128); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "salmon", {
        get: function () { return new Color(250, 128, 114); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "darkSalmon", {
        get: function () { return new Color(233, 150, 122); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "crimson", {
        get: function () { return new Color(220, 20, 60); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "red", {
        get: function () { return new Color(255, 0, 0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "firebrick", {
        get: function () { return new Color(178, 34, 34); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "darkRed", {
        get: function () { return new Color(139, 0, 0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "pink", {
        get: function () { return new Color(255, 192, 203); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "lightPink", {
        get: function () { return new Color(255, 182, 193); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "hotPink", {
        get: function () { return new Color(255, 105, 180); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "deepPink", {
        get: function () { return new Color(255, 20, 147); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "mediumViolet", {
        get: function () { return new Color(199, 21, 133); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "paleViolet", {
        get: function () { return new Color(219, 112, 147); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "lightSalmon", {
        get: function () { return new Color(255, 160, 122); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "coral", {
        get: function () { return new Color(255, 127, 80); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "tomato", {
        get: function () { return new Color(255, 99, 71); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "orangeRed", {
        get: function () { return new Color(255, 69, 0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "darkOrange", {
        get: function () { return new Color(255, 140, 0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "orange", {
        get: function () { return new Color(255, 165, 0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "gold", {
        get: function () { return new Color(255, 215, 0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "yellow", {
        get: function () { return new Color(255, 215, 0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "lightYellow", {
        get: function () { return new Color(255, 255, 224); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "lemonChiffon", {
        get: function () { return new Color(255, 250, 205); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "lightGoldenRodYellow", {
        get: function () { return new Color(250, 250, 210); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "papayWhip", {
        get: function () { return new Color(255, 239, 213); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "moccasin", {
        get: function () { return new Color(255, 228, 181); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "peachPuff", {
        get: function () { return new Color(255, 218, 185); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "paleGoldenRod", {
        get: function () { return new Color(238, 232, 170); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "khaki", {
        get: function () { return new Color(240, 230, 140); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "darkKhaki", {
        get: function () { return new Color(189, 183, 107); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "lavender", {
        get: function () { return new Color(230, 230, 250); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "thistle", {
        get: function () { return new Color(216, 191, 216); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "plum", {
        get: function () { return new Color(221, 160, 221); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "violet", {
        get: function () { return new Color(238, 130, 238); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "orchid", {
        get: function () { return new Color(218, 112, 214); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "fuchsia", {
        get: function () { return new Color(255, 0, 255); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "magenta", {
        get: function () { return new Color(255, 0, 255); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "mediumOrchid", {
        get: function () { return new Color(186, 85, 211); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "mediumPurple", {
        get: function () { return new Color(147, 112, 219); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "rebeccaPurple", {
        get: function () { return new Color(102, 51, 153); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "blueViolet", {
        get: function () { return new Color(138, 43, 226); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "darkViolet", {
        get: function () { return new Color(148, 0, 211); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "darkOrchid", {
        get: function () { return new Color(153, 50, 204); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "darkMagenta", {
        get: function () { return new Color(139, 0, 139); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "purple", {
        get: function () { return new Color(128, 0, 128); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "indigo", {
        get: function () { return new Color(75, 0, 130); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "slateBlue", {
        get: function () { return new Color(106, 90, 205); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "darkSlateBlue", {
        get: function () { return new Color(72, 61, 139); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "greenYellow", {
        get: function () { return new Color(173, 255, 47); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "chartreuse", {
        get: function () { return new Color(127, 255, 0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "lawnGreen", {
        get: function () { return new Color(124, 252, 0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "lime", {
        get: function () { return new Color(0, 255, 0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "limeGreen", {
        get: function () { return new Color(50, 205, 50); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "paleGreen", {
        get: function () { return new Color(152, 251, 152); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "lightGreen", {
        get: function () { return new Color(144, 238, 144); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "mediumSpringGreen", {
        get: function () { return new Color(0, 250, 154); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "springGreen", {
        get: function () { return new Color(0, 255, 127); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "mediumSeaGreen", {
        get: function () { return new Color(60, 179, 113); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "seaGreen", {
        get: function () { return new Color(60, 179, 113); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "forestGreen", {
        get: function () { return new Color(34, 139, 34); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "green", {
        get: function () { return new Color(0, 128, 0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "darkGreen", {
        get: function () { return new Color(0, 100, 0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "yellowGreen", {
        get: function () { return new Color(154, 205, 50); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "oliveDrab", {
        get: function () { return new Color(107, 142, 35); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "olive", {
        get: function () { return new Color(128, 128, 0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "darkOliveGreen", {
        get: function () { return new Color(85, 107, 47); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "mediumAquaMarine", {
        get: function () { return new Color(102, 205, 170); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "darkSeaGreen", {
        get: function () { return new Color(143, 188, 139); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "lightSeaGreen", {
        get: function () { return new Color(32, 178, 170); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "darkCyan", {
        get: function () { return new Color(0, 139, 139); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "teal", {
        get: function () { return new Color(0, 128, 128); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "cyan", {
        get: function () { return new Color(0, 255, 255); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "lightCyan", {
        get: function () { return new Color(224, 255, 255); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "paleTurquoise", {
        get: function () { return new Color(175, 238, 238); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "aquaMarine", {
        get: function () { return new Color(127, 255, 212); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "turquoise", {
        get: function () { return new Color(64, 224, 208); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "mediumTurquoise", {
        get: function () { return new Color(72, 209, 204); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "darkTurquoise", {
        get: function () { return new Color(0, 206, 209); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "cadetBlue", {
        get: function () { return new Color(95, 158, 160); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "steelBlue", {
        get: function () { return new Color(70, 130, 180); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "lightSteelBlue", {
        get: function () { return new Color(176, 196, 222); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "powderBlue", {
        get: function () { return new Color(176, 224, 230); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "lightBlue", {
        get: function () { return new Color(173, 216, 230); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "skyBlue", {
        get: function () { return new Color(135, 206, 235); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "lightSkyBlue", {
        get: function () { return new Color(135, 206, 250); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "deepSkyBlue", {
        get: function () { return new Color(0, 191, 255); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "dodgerBlue", {
        get: function () { return new Color(30, 144, 255); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "cornFlowerBlue", {
        get: function () { return new Color(100, 149, 237); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "mediumSlateBlue", {
        get: function () { return new Color(123, 104, 238); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "royalBlue", {
        get: function () { return new Color(65, 105, 225); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "blue", {
        get: function () { return new Color(0, 0, 255); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "mediumBlue", {
        get: function () { return new Color(0, 0, 205); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "darkBlue", {
        get: function () { return new Color(0, 0, 139); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "navy", {
        get: function () { return new Color(0, 0, 128); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "midnighBlue", {
        get: function () { return new Color(25, 25, 112); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "blueberry", {
        get: function () { return new Color(79, 134, 247); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "cornSilk", {
        get: function () { return new Color(255, 248, 220); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "blanchedAlmond", {
        get: function () { return new Color(255, 235, 205); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "bisque", {
        get: function () { return new Color(255, 228, 196); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "navajoWhite", {
        get: function () { return new Color(255, 222, 173); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "wheat", {
        get: function () { return new Color(245, 222, 179); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "burlyWood", {
        get: function () { return new Color(222, 184, 135); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "tan", {
        get: function () { return new Color(210, 180, 140); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "rosyBrown", {
        get: function () { return new Color(188, 143, 143); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "sandyBrown", {
        get: function () { return new Color(244, 164, 96); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "goldenRod", {
        get: function () { return new Color(218, 165, 32); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "darkGoldenRod", {
        get: function () { return new Color(184, 134, 11); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "peru", {
        get: function () { return new Color(205, 133, 63); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "chocolate", {
        get: function () { return new Color(210, 105, 30); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "saddleBrown", {
        get: function () { return new Color(139, 69, 19); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "sienna", {
        get: function () { return new Color(160, 82, 45); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "brown", {
        get: function () { return new Color(165, 42, 42); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "maroon", {
        get: function () { return new Color(128, 0, 0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "white", {
        get: function () { return new Color(255, 255, 255); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "snow", {
        get: function () { return new Color(255, 250, 250); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "honeyDew", {
        get: function () { return new Color(240, 255, 240); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "mintCream", {
        get: function () { return new Color(245, 255, 250); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "azure", {
        get: function () { return new Color(240, 255, 255); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "aliceBlue", {
        get: function () { return new Color(240, 248, 255); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "ghostWhite", {
        get: function () { return new Color(248, 248, 255); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "whiteSmoke", {
        get: function () { return new Color(245, 245, 245); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "seaShell", {
        get: function () { return new Color(255, 245, 238); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "beige", {
        get: function () { return new Color(245, 245, 220); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "oldLace", {
        get: function () { return new Color(253, 245, 230); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "floralWhite", {
        get: function () { return new Color(255, 250, 240); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "ivory", {
        get: function () { return new Color(255, 255, 240); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "antiqueWhite", {
        get: function () { return new Color(250, 235, 215); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "linen", {
        get: function () { return new Color(250, 240, 230); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "lavenderBlush", {
        get: function () { return new Color(255, 240, 245); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "mistyRose", {
        get: function () { return new Color(255, 228, 225); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "gainsBoro", {
        get: function () { return new Color(220, 220, 220); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "lightGray", {
        get: function () { return new Color(211, 211, 211); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "silver", {
        get: function () { return new Color(192, 192, 192); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "darkGray", {
        get: function () { return new Color(169, 169, 169); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "gray", {
        get: function () { return new Color(128, 128, 128); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "dimGray", {
        get: function () { return new Color(105, 105, 105); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "lightSlateGray", {
        get: function () { return new Color(119, 136, 153); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "slateGray", {
        get: function () { return new Color(112, 128, 144); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "darkSlateGray", {
        get: function () { return new Color(47, 79, 79); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "black", {
        get: function () { return new Color(0, 0, 0); },
        enumerable: true,
        configurable: true
    });
    return Color;
}());
exports.Color = Color;
