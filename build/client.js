(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
module.exports = require('./lib/index');

},{"./lib/index":5}],2:[function(require,module,exports){
'use strict';

var randomFromSeed = require('./random/random-from-seed');

var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
var alphabet;
var previousSeed;

var shuffled;

function reset() {
    shuffled = false;
}

function setCharacters(_alphabet_) {
    if (!_alphabet_) {
        if (alphabet !== ORIGINAL) {
            alphabet = ORIGINAL;
            reset();
        }
        return;
    }

    if (_alphabet_ === alphabet) {
        return;
    }

    if (_alphabet_.length !== ORIGINAL.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
    }

    var unique = _alphabet_.split('').filter(function(item, ind, arr){
       return ind !== arr.lastIndexOf(item);
    });

    if (unique.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
    }

    alphabet = _alphabet_;
    reset();
}

function characters(_alphabet_) {
    setCharacters(_alphabet_);
    return alphabet;
}

function setSeed(seed) {
    randomFromSeed.seed(seed);
    if (previousSeed !== seed) {
        reset();
        previousSeed = seed;
    }
}

function shuffle() {
    if (!alphabet) {
        setCharacters(ORIGINAL);
    }

    var sourceArray = alphabet.split('');
    var targetArray = [];
    var r = randomFromSeed.nextValue();
    var characterIndex;

    while (sourceArray.length > 0) {
        r = randomFromSeed.nextValue();
        characterIndex = Math.floor(r * sourceArray.length);
        targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
    }
    return targetArray.join('');
}

function getShuffled() {
    if (shuffled) {
        return shuffled;
    }
    shuffled = shuffle();
    return shuffled;
}

/**
 * lookup shuffled letter
 * @param index
 * @returns {string}
 */
function lookup(index) {
    var alphabetShuffled = getShuffled();
    return alphabetShuffled[index];
}

module.exports = {
    characters: characters,
    seed: setSeed,
    lookup: lookup,
    shuffled: getShuffled
};

},{"./random/random-from-seed":8}],3:[function(require,module,exports){
'use strict';
var alphabet = require('./alphabet');

/**
 * Decode the id to get the version and worker
 * Mainly for debugging and testing.
 * @param id - the shortid-generated id.
 */
function decode(id) {
    var characters = alphabet.shuffled();
    return {
        version: characters.indexOf(id.substr(0, 1)) & 0x0f,
        worker: characters.indexOf(id.substr(1, 1)) & 0x0f
    };
}

module.exports = decode;

},{"./alphabet":2}],4:[function(require,module,exports){
'use strict';

var randomByte = require('./random/random-byte');

function encode(lookup, number) {
    var loopCounter = 0;
    var done;

    var str = '';

    while (!done) {
        str = str + lookup( ( (number >> (4 * loopCounter)) & 0x0f ) | randomByte() );
        done = number < (Math.pow(16, loopCounter + 1 ) );
        loopCounter++;
    }
    return str;
}

module.exports = encode;

},{"./random/random-byte":7}],5:[function(require,module,exports){
'use strict';

var alphabet = require('./alphabet');
var encode = require('./encode');
var decode = require('./decode');
var isValid = require('./is-valid');

// Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.
// This number should be updated every year or so to keep the generated id short.
// To regenerate `new Date() - 0` and bump the version. Always bump the version!
var REDUCE_TIME = 1459707606518;

// don't change unless we change the algos or REDUCE_TIME
// must be an integer and less than 16
var version = 6;

// if you are using cluster or multiple servers use this to make each instance
// has a unique value for worker
// Note: I don't know if this is automatically set when using third
// party cluster solutions such as pm2.
var clusterWorkerId = require('./util/cluster-worker-id') || 0;

// Counter is used when shortid is called multiple times in one second.
var counter;

// Remember the last time shortid was called in case counter is needed.
var previousSeconds;

/**
 * Generate unique id
 * Returns string id
 */
function generate() {

    var str = '';

    var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);

    if (seconds === previousSeconds) {
        counter++;
    } else {
        counter = 0;
        previousSeconds = seconds;
    }

    str = str + encode(alphabet.lookup, version);
    str = str + encode(alphabet.lookup, clusterWorkerId);
    if (counter > 0) {
        str = str + encode(alphabet.lookup, counter);
    }
    str = str + encode(alphabet.lookup, seconds);

    return str;
}


/**
 * Set the seed.
 * Highly recommended if you don't want people to try to figure out your id schema.
 * exposed as shortid.seed(int)
 * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
 */
function seed(seedValue) {
    alphabet.seed(seedValue);
    return module.exports;
}

/**
 * Set the cluster worker or machine id
 * exposed as shortid.worker(int)
 * @param workerId worker must be positive integer.  Number less than 16 is recommended.
 * returns shortid module so it can be chained.
 */
function worker(workerId) {
    clusterWorkerId = workerId;
    return module.exports;
}

/**
 *
 * sets new characters to use in the alphabet
 * returns the shuffled alphabet
 */
function characters(newCharacters) {
    if (newCharacters !== undefined) {
        alphabet.characters(newCharacters);
    }

    return alphabet.shuffled();
}


// Export all other functions as properties of the generate function
module.exports = generate;
module.exports.generate = generate;
module.exports.seed = seed;
module.exports.worker = worker;
module.exports.characters = characters;
module.exports.decode = decode;
module.exports.isValid = isValid;

},{"./alphabet":2,"./decode":3,"./encode":4,"./is-valid":6,"./util/cluster-worker-id":9}],6:[function(require,module,exports){
'use strict';
var alphabet = require('./alphabet');

function isShortId(id) {
    if (!id || typeof id !== 'string' || id.length < 6 ) {
        return false;
    }

    var characters = alphabet.characters();
    var len = id.length;
    for(var i = 0; i < len;i++) {
        if (characters.indexOf(id[i]) === -1) {
            return false;
        }
    }
    return true;
}

module.exports = isShortId;

},{"./alphabet":2}],7:[function(require,module,exports){
'use strict';

var crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto

function randomByte() {
    if (!crypto || !crypto.getRandomValues) {
        return Math.floor(Math.random() * 256) & 0x30;
    }
    var dest = new Uint8Array(1);
    crypto.getRandomValues(dest);
    return dest[0] & 0x30;
}

module.exports = randomByte;

},{}],8:[function(require,module,exports){
'use strict';

// Found this seed-based random generator somewhere
// Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)

var seed = 1;

/**
 * return a random number based on a seed
 * @param seed
 * @returns {number}
 */
function getNextValue() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed/(233280.0);
}

function setSeed(_seed_) {
    seed = _seed_;
}

module.exports = {
    nextValue: getNextValue,
    seed: setSeed
};

},{}],9:[function(require,module,exports){
'use strict';

module.exports = 0;

},{}],10:[function(require,module,exports){
"use strict";
var WorkspaceController = (function () {
    function WorkspaceController() {
    }
    WorkspaceController.prototype.setWorkspaceManager = function (wsManager) {
        this.wsManager = wsManager;
    };
    WorkspaceController.prototype.createWorkspace = function (workspace) {
        var tabs = document.querySelector('section.areas div.tabs');
        var workspaces = document.querySelector('section.areas div.workspaces');
        var workspaceTab = document.createElement('a');
        workspaceTab.classList.add('workspace-tab');
        workspaceTab.setAttribute('data-id', workspace.id);
        workspaceTab.innerHTML = "<span>" + workspace.title + "</span><span><i class=\"fa fa-close\"></i></span>";
        var $this = this;
        workspaceTab.addEventListener('click', function (e) {
            var target = e.currentTarget;
            $this.focusWorkspace(target.getAttribute('data-id'));
        });
        workspaceTab.querySelector('span:last-child').addEventListener('click', function (e) {
            e.stopPropagation();
            var target = e.currentTarget;
            $this.removeWorkspace(target.parentElement.getAttribute('data-id'));
        });
        var workspaceArea = document.createElement('div');
        workspaceArea.classList.add('hidden');
        workspaceArea.classList.add('workspace-area');
        workspaceArea.setAttribute('data-id', workspace.id);
        var transCanvas = document.createElement('canvas');
        transCanvas.width = workspace.width;
        transCanvas.height = workspace.height;
        transCanvas.classList.add('transparent');
        this.setTransImage(transCanvas);
        var canvas = document.createElement('canvas');
        canvas.width = workspace.width;
        canvas.height = workspace.height;
        workspaceArea.appendChild(transCanvas);
        workspaceArea.appendChild(canvas);
        workspaces.appendChild(workspaceArea);
        tabs.appendChild(workspaceTab);
        this.focusWorkspace(workspace.id);
    };
    WorkspaceController.prototype.setTransImage = function (canvas) {
        var img = new Image();
        img.src = '../../images/transparent.png';
        img.onload = function () {
            var context = canvas.getContext('2d');
            var pattern = context.createPattern(img, 'repeat');
            context.fillStyle = pattern;
            context.fillRect(0, 0, canvas.width, canvas.height);
        };
    };
    WorkspaceController.prototype.focusWorkspace = function (id) {
        var tabs = document.querySelectorAll('.workspace-tab');
        for (var i = 0; i < tabs.length; i++) {
            var tab = tabs.item(i);
            tab.classList.remove('active');
        }
        var areas = document.querySelectorAll('.workspace-area');
        for (var i = 0; i < areas.length; i++) {
            var area = areas.item(i);
            area.classList.add('hidden');
        }
        var wsa = document.querySelector(".workspace-area[data-id=\"" + id + "\"]");
        var wst = document.querySelector(".workspace-tab[data-id=\"" + id + "\"]");
        wsa.classList.remove('hidden');
        wst.classList.add('active');
    };
    WorkspaceController.prototype.removeWorkspace = function (id) {
        for (var i in this.wsManager.items) {
            var item = this.wsManager.items[i];
            if (item.id == id) {
                if (item.isDirty) {
                    alert('Workspace is dirty');
                    return;
                }
                var wsa = document.querySelector(".workspace-area[data-id=\"" + id + "\"]");
                var wst = document.querySelector(".workspace-tab[data-id=\"" + id + "\"]");
                wsa.parentNode.removeChild(wsa);
                wst.parentNode.removeChild(wst);
                this.wsManager.remove(item);
                return;
            }
        }
    };
    return WorkspaceController;
}());
exports.WorkspaceController = WorkspaceController;

},{}],11:[function(require,module,exports){
"use strict";
var Workspace_1 = require('./utils/Workspace');
var Manager_1 = require('./managers/Manager');
var WorkspaceController_1 = require('./controllers/WorkspaceController');
var wsController = new WorkspaceController_1.WorkspaceController();
var workspaces = new Manager_1.Manager();
wsController.setWorkspaceManager(workspaces);
workspaces.add(new Workspace_1.Workspace('one', 100, 100));
workspaces.add(new Workspace_1.Workspace('two', 200, 200));
workspaces.add(new Workspace_1.Workspace('three', 300, 300));
workspaces.items.forEach(function (workspace) {
    wsController.createWorkspace(workspace);
});

},{"./controllers/WorkspaceController":10,"./managers/Manager":12,"./utils/Workspace":13}],12:[function(require,module,exports){
"use strict";
var Manager = (function () {
    function Manager() {
        this._items = [];
    }
    Object.defineProperty(Manager.prototype, "items", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    Manager.prototype.add = function (item) {
        if (!this.contains(item)) {
            this._items.push(item);
        }
        return this;
    };
    Manager.prototype.remove = function (item) {
        if (this.contains(item)) {
            this._items.splice(this._items.indexOf(item), 1);
        }
        return this;
    };
    Manager.prototype.contains = function (item) {
        return this._items.indexOf(item) > -1 ? true : false;
    };
    return Manager;
}());
exports.Manager = Manager;

},{}],13:[function(require,module,exports){
"use strict";
var Manager_1 = require('../managers/Manager');
var shortid = require('shortid');
var Workspace = (function () {
    function Workspace(title, width, height) {
        this._title = '';
        this._isDirty = false;
        this._width = 1;
        this._height = 1;
        this._layers = new Manager_1.Manager();
        this._title = title;
        this._width = width;
        this._height = height;
        this._id = shortid.generate();
    }
    Object.defineProperty(Workspace.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Workspace.prototype, "title", {
        get: function () {
            return this._title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Workspace.prototype, "isDirty", {
        get: function () {
            return this._isDirty;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Workspace.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Workspace.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Workspace.prototype, "layers", {
        get: function () {
            return this._layers;
        },
        enumerable: true,
        configurable: true
    });
    return Workspace;
}());
exports.Workspace = Workspace;

},{"../managers/Manager":12,"shortid":1}]},{},[11]);
