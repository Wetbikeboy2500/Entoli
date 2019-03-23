"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntoliOutput = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var log = require('simple-node-logger').createSimpleFileLogger('project.log');

var EntoliOutput = function () {
  function EntoliOutput() {
    var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, EntoliOutput);

    this.values = new Map(attributes);
    this.output = [];
  }

  _createClass(EntoliOutput, [{
    key: "setup",
    value: function setup() {
      var _this = this;

      var arr1 = [['Select an option'], [function () {
        return _this.get("i");
      }, ") Hello World"], [function () {
        return _this.get("i") + 1;
      }, ") Exit"], ["Last key pressed, ", function () {
        return _this.get("key");
      }, ", ", function () {
        return _this.get("o");
      }]];
      this.template = arr1;
      var that = this;
      this.output = this.template.map(function (a, i) {
        return that.buildOutput(that.template.length - 1 - i);
      });

      for (var i = 0; i < this.template.length; i++) {
        this.render(i);
      }
    }
  }, {
    key: "get",
    value: function get(name) {
      if (this.values.has(name)) {
        return this.values.get(name);
      }

      return null;
    }
  }, {
    key: "update",
    value: function update() {
      var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      this.values = new Map([].concat(_toConsumableArray(this.values), _toConsumableArray(attributes)));
      this.checkDiff();
    }
  }, {
    key: "checkDiff",
    value: function checkDiff() {
      var difs = [];
      var that = this;
      this.template.forEach(function (a, i) {
        var line = that.template.length - 1 - i;
        var build = that.buildOutput(line);

        if (build !== that.output[i]) {
          that.output[i] = build;
          difs.push(line);
        }
      });
      log.info(difs);
      var _arr = difs;

      for (var _i = 0; _i < _arr.length; _i++) {
        var a = _arr[_i];
        this.render(a);
      }
    }
  }, {
    key: "render",
    value: function render(line) {
      this.clear(line);
      process.stdout.moveCursor(0, line * -1);
      process.stdout.cursorTo(0);
      process.stdout.write(this.output[this.output.length - 1 - line]);
      process.stdout.moveCursor(0, line);
    }
  }, {
    key: "clear",
    value: function clear(line) {
      process.stdout.moveCursor(0, line * -1);
      process.stdout.clearLine(0);
      process.stdout.moveCursor(0, line);
    }
  }, {
    key: "buildOutput",
    value: function buildOutput(line) {
      line = Math.min(this.template.length - 1, line);
      var data = this.template[this.template.length - 1 - line];
      return data.map(function (a) {
        if (typeof a == 'function') {
          return a();
        }

        return a;
      }).join('');
    }
  }]);

  return EntoliOutput;
}();

exports.EntoliOutput = EntoliOutput;