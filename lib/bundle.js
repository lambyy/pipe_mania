/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pipe = function () {
  function Pipe() {
    var flow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Pipe.random();

    _classCallCheck(this, Pipe);

    this.flow = flow;
    this.img = flow.img;
    this.fill = false;
  }

  _createClass(Pipe, [{
    key: "setFlowIn",
    value: function setFlowIn(dir) {
      this.flow[dir] = "in";
    }
  }, {
    key: "setFlowOut",
    value: function setFlowOut(dir) {
      this.flow[dir] = "out";
    }
  }, {
    key: "checkConnection",
    value: function checkConnection(otherPipe) {
      var dir1 = this.getFlowDir('out');
      var dir2 = Pipe.complement(dir1);
      return otherPipe.flow.hasOwnProperty(dir2);
    }
  }, {
    key: "getFlowDir",
    value: function getFlowDir(flow) {
      var _this = this;

      return Object.keys(this.flow).find(function (key) {
        return _this.flow[key] === flow;
      });
    }
  }, {
    key: "resetFlow",
    value: function resetFlow() {
      var _this2 = this;

      Object.keys(this.flow).forEach(function (flow) {
        if (flow !== "img") {
          _this2.flow[flow] = "";
        }
      });
    }
  }], [{
    key: "complement",
    value: function complement(dir) {
      switch (dir) {
        case 'up':
          return 'down';
        case 'down':
          return 'up';
        case 'left':
          return 'right';
        case 'right':
          return 'left';
        default:
          return "";
      }
    }
  }, {
    key: "source",
    value: function source() {
      return new Pipe({ 'right': 'out', img: 6 });
    }
  }, {
    key: "destination",
    value: function destination() {
      return new Pipe({ 'up': 'in', img: 1 });
    }
  }, {
    key: "random",
    value: function random() {
      return Pipe.SECTIONS[Math.floor(Math.random() * Pipe.SECTIONS.length)];
    }
  }]);

  return Pipe;
}();

Pipe.SECTIONS = [{ 'up': '', 'down': '', 'img': 1 }, { 'left': '', 'right': '', 'img': 0 }, { 'up': '', 'down': '', 'img': 1 }, { 'left': '', 'right': '', 'img': 0 }, { 'up': '', 'left': '', 'img': 3 }, { 'up': '', 'right': '', 'img': 4 }, { 'down': '', 'left': '', 'img': 2 }, { 'down': '', 'right': '', 'img': 5 }];

Pipe.MOVES = {
  'up': [0, -1],
  'down': [0, 1],
  'left': [-1, 0],
  'right': [1, 0]
};

exports.default = Pipe;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(2);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function () {
  var board = document.getElementById("board");
  board.width = 650;
  board.height = 500;

  var ctx = board.getContext("2d");

  var game = new _game2.default(ctx);
  var pipeMania = document.getElementById("pipe-mania");
  var instructions = document.getElementById("instructions");
  var content = document.getElementById("content");
  var timer = document.getElementById("timerProgress");
  var start = document.getElementById("start");
  var restart = document.getElementById("restart");
  var quickFinish = document.getElementById("quick-finish");

  start.addEventListener("click", function (e) {
    e.preventDefault();
    pipeMania.removeChild(instructions);
    timer.classList.remove("hidden");
    content.classList.remove("hidden");
    start.disabled = true;
    game.start();
  });

  restart.addEventListener("click", function (e) {
    e.preventDefault();
    game.end();
  });

  quickFinish.addEventListener("click", function (e) {
    e.preventDefault();
    game.finishLevel();
  });

  var result = document.getElementById("result");
  var next = document.getElementById("next");
  next.addEventListener("click", function (e) {
    e.preventDefault();
    result.classList.add("hidden");
    next.disabled = true;
    game.setupGame();
    game.round();
    game.disableRestart(false);
  });
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _board = __webpack_require__(3);

var _board2 = _interopRequireDefault(_board);

var _pipe = __webpack_require__(0);

var _pipe2 = _interopRequireDefault(_pipe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(ctx) {
    _classCallCheck(this, Game);

    this.ctx = ctx;
    this.images = this._loadImages();

    this.level = 1;
    this.levelBoard = document.getElementById("level");
    this.scoreBoard = document.getElementById("score");
    this.result = document.getElementById("result");
    this.levelResult = document.getElementById("level-result");
    this.next = document.getElementById("next");
    this.target = document.getElementById("target");
    this.restart = document.getElementById("restart");
    this.quickFinish = document.getElementById("quick-finish");

    this.setupGame();
  }

  _createClass(Game, [{
    key: 'setupGame',
    value: function setupGame() {
      var sourcePos = this._randomSourcePos();
      var destinationPos = this._randomDestinationPos();

      this.board = new _board2.default(this.images, sourcePos, destinationPos);
      this.pipeQueue = [new _pipe2.default(), new _pipe2.default(), new _pipe2.default()];
      this.board.placePipe(_pipe2.default.source(), sourcePos);
      this.board.placePipe(_pipe2.default.destination(), destinationPos);
      this.board.setCurrentPos();
      this.board.points = 0;
      this.scoreBoard.innerHTML = 'Score: ' + this.board.points;
      this.target.innerHTML = 'Target: ' + (20 + 20 * this.level);
      this.board.drawGrid(this.ctx);
      this.draw();
    }
  }, {
    key: '_loadImages',
    value: function _loadImages() {
      var images = [];
      for (var i = 0; i < 7; i++) {
        var img = document.getElementById('pipe' + i);
        images.push(img);
      }
      return images;
    }
  }, {
    key: '_randomSourcePos',
    value: function _randomSourcePos() {
      var y = Math.floor(Math.random() * 7);
      return [0, y];
    }
  }, {
    key: '_randomDestinationPos',
    value: function _randomDestinationPos() {
      var x = Math.floor(Math.random() * 6) + 2;
      return [x, 7];
    }
  }, {
    key: 'disableRestart',
    value: function disableRestart(disable) {
      this.restart.disabled = disable;
      this.quickFinish.disabled = disable;
    }
  }, {
    key: 'start',
    value: function start() {
      this.bindKeyHandlers();
      this.board.points = 0;
      this.round();
    }
  }, {
    key: 'round',
    value: function round() {
      this.disableRestart(false);
      this.levelBoard.innerHTML = 'Level ' + this.level;
      this.draw();
      // referenced w3schools.com/howto/howto_js_progressbar.asp
      this.timerBar = document.getElementById("timerBar");
      var width = 1;
      this.timerInterval = setInterval(function () {
        if (width >= 99) {
          clearInterval(this.timerInterval);
        } else {
          width += 3;
          this.timerBar.style.width = width + '%';
        }
      }.bind(this), 1000);
      this.timeout = setTimeout(function () {
        this.checkWin();
      }.bind(this), 28000);
    }
  }, {
    key: 'finishLevel',
    value: function finishLevel() {
      clearInterval(this.timerInterval);
      clearInterval(this.flowInterval);
      clearTimeout(this.timeout);
      this.disableRestart(true);
      this.checkWin(300);
    }
  }, {
    key: 'checkWin',
    value: function checkWin() {
      var interval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5000;

      this.flowInterval = setInterval(function () {
        var won = this.board.checkWin(this.flowInterval);
        this.scoreBoard.innerHTML = 'Score: ' + this.board.points;
        this.draw();
        if (won === "winner") {
          if (this.board.points >= 20 + 20 * this.level) {
            this.evalResult(this.level + 1, "Completed the level!", "Continue");
          } else {
            var levelResult = 'Needed ' + (20 + 20 * this.level) + ' points to pass level!';
            this.evalResult(this.level, levelResult, "Try Again!");
          }
        } else if (won === "game over") {
          this.evalResult(1, "Game Over!", "Play Again");
        }
      }.bind(this), interval);
    }
  }, {
    key: 'evalResult',
    value: function evalResult(level, levelResult, next) {
      this.next.disabled = false;
      this.disableRestart(true);
      this.level = level;
      this.levelResult.innerHTML = levelResult;
      this.next.innerHTML = next;
      this.result.classList.remove("hidden");
    }
  }, {
    key: 'end',
    value: function end() {
      clearInterval(this.timerInterval);
      clearInterval(this.flowInterval);
      clearTimeout(this.timeout);
      this.disableRestart(true);
      this.timerBar.style.width = '1%';
      this.ctx.clearRect(0, 0, 700, 500);
      this.setupGame();
      this.round();
    }
  }, {
    key: 'bindKeyHandlers',
    value: function bindKeyHandlers() {
      document.addEventListener("keydown", function (e) {
        this.board.updateSelectedPos(e.keyCode);
        if (e.keyCode === 32 && !this.board.checkPos()) {
          this.board.placePipe(this.pipeQueue.shift());
          this.pipeQueue.push(new _pipe2.default());
        }
        this.draw();
      }.bind(this));
    }
  }, {
    key: 'draw',
    value: function draw() {
      var _this = this;

      this.board.draw(this.ctx);

      this.pipeQueue.forEach(function (pipe, y) {
        var img = _this.images[pipe.img];
        var width = _board2.default.WIDTH;
        var xPos = 9 * width;
        var yPos = y * width + 1.5 * width;
        _this.ctx.clearRect(xPos, yPos, width, width);
        _this.ctx.fillStyle = '#E0E0D1';
        _this.ctx.fillRect(xPos, yPos, width, width);
        _this.ctx.drawImage(img, xPos, yPos, width, width);
      });
    }
  }]);

  return Game;
}();

exports.default = Game;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pipe = __webpack_require__(0);

var _pipe2 = _interopRequireDefault(_pipe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
  function Board(images, sourcePos, destinationPos) {
    _classCallCheck(this, Board);

    this.grid = this._makeGrid();
    this.selectPos = [0, 0];
    this.prevSelect = [0, 0];
    this.sourcePos = sourcePos;
    this.destinationPos = destinationPos;
    this.points = 0;
    this.images = images;
    this.dirt = document.getElementById("dirt");
  }

  _createClass(Board, [{
    key: "_makeGrid",
    value: function _makeGrid() {
      var grid = [];

      for (var i = 0; i < 8; i++) {
        grid.push(["", "", "", "", "", "", "", ""]);
      }

      return grid;
    }
  }, {
    key: "setCurrentPos",
    value: function setCurrentPos() {
      this.currentPos = this.sourcePos;
      this.currentPipe = this.grid[this.currentPos[0]][this.currentPos[1]];
    }
  }, {
    key: "placePipe",
    value: function placePipe(pipe) {
      var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.selectPos;

      this.grid[pos[0]][pos[1]] = pipe;
    }
  }, {
    key: "checkPos",
    value: function checkPos() {
      var pos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.selectPos;

      var source = Board.posEquals(pos, this.sourcePos);
      var destination = Board.posEquals(pos, this.destinationPos);
      return source || destination;
    }
  }, {
    key: "updateSelectedPos",
    value: function updateSelectedPos(keyCode) {
      var move = Board.MOVES[keyCode];

      if (move) {
        var moveX = (this.selectPos[0] + move[0]) % 8;
        var moveY = (this.selectPos[1] + move[1]) % 8;
        if (moveX < 0) moveX = 7;
        if (moveY < 0) moveY = 7;
        this.selectPos = [moveX, moveY];
      }
    }
  }, {
    key: "checkWin",
    value: function checkWin(interval) {
      var flowDir = this.currentPipe.getFlowDir('out');
      var move = _pipe2.default.MOVES[flowDir];
      var nextPos = [this.currentPos[0] + move[0], this.currentPos[1] + move[1]];
      var nextPipe = void 0;
      if (this.boundary(nextPos)) {
        nextPipe = this.grid[nextPos[0]][nextPos[1]];
      }

      if (nextPipe && this.currentPipe.checkConnection(nextPipe)) {
        nextPipe.resetFlow();
        this.points += 10;
        var flowIn = _pipe2.default.complement(flowDir);
        nextPipe.setFlowIn(flowIn);
        var flowOut = nextPipe.getFlowDir("");
        if (flowOut) {
          nextPipe.setFlowOut(flowOut);
        }
        nextPipe.fill = true;

        this.currentPos = nextPos;
        this.currentPipe = nextPipe;

        if (nextPos[0] === this.destinationPos[0] && nextPos[1] === this.destinationPos[1]) {
          clearInterval(interval);
          return "winner";
        }
      } else {
        clearInterval(interval);
        return "game over";
      }
      return "continue";
    }
  }, {
    key: "drawGrid",
    value: function drawGrid(ctx) {
      var _this = this;

      this.grid.forEach(function (row, x) {
        row.forEach(function (pipe, y) {
          var xPos = x * Board.WIDTH;
          var yPos = y * Board.WIDTH;
          var width = Board.WIDTH;
          ctx.drawImage(_this.dirt, xPos, yPos, width, width);
        });
      });
    }
  }, {
    key: "drawPipe",
    value: function drawPipe(ctx, pipe, x, y) {
      var fillColor = '#E0E0D1';
      if (this.checkPos([x, y])) {
        fillColor = '#DF2A2A';
      } else if (pipe.fill) {
        fillColor = '#6EAAE7';
      }
      var width = Board.WIDTH;
      var xPos = x * width;
      var yPos = y * width;
      ctx.fillStyle = fillColor;
      ctx.fillRect(xPos, yPos, width, width);
      ctx.drawImage(this.images[pipe.img], xPos, yPos, width, width);
    }
  }, {
    key: "drawDestinationBackground",
    value: function drawDestinationBackground(ctx) {
      ctx.fillStyle = "#DF2A2A";
      var destinationX = this.destinationPos[0] * Board.WIDTH;
      var destinationY = this.destinationPos[1] * Board.WIDTH;
      ctx.fillRect(destinationX, destinationY, Board.WIDTH, Board.WIDTH);
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      var _this2 = this;

      var width = Board.WIDTH;
      ctx.clearRect(this.prevSelect[0], this.prevSelect[1], width, width);
      ctx.drawImage(this.dirt, this.prevSelect[0], this.prevSelect[1], width, width);
      this.grid.forEach(function (row, x) {
        row.forEach(function (square, y) {
          if (square !== "") {
            _this2.drawPipe(ctx, square, x, y);
          }
        });
      });
      ctx.fillStyle = 'rgba(0, 204, 102, 0.3)';
      var x = this.selectPos[0] * width;
      var y = this.selectPos[1] * width;
      ctx.fillRect(x, y, width, width);
      this.prevSelect = [x, y];
    }
  }, {
    key: "boundary",
    value: function boundary(pos) {
      return pos[0] >= 0 && pos[0] < 8 && pos[1] >= 0 && pos[1] < 8;
    }
  }], [{
    key: "posEquals",
    value: function posEquals(pos1, pos2) {
      return pos1[0] === pos2[0] && pos1[1] === pos2[1];
    }
  }]);

  return Board;
}();

Board.MOVES = {
  38: [0, -1],
  37: [-1, 0],
  40: [0, 1],
  39: [1, 0]
};

Board.WIDTH = 60;

exports.default = Board;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map