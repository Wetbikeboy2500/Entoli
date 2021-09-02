"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntoliOutput = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EntoliOutput = function () {
  function EntoliOutput() {
    var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, EntoliOutput);

    this.values = new Map(attributes);
    this.line = 0;
    this.output = [];
    this.enabled = true;
    this.isSetup = false;
  }

  _createClass(EntoliOutput, [{
    key: "setup",
    value: function setup(arr1) {
      var _this = this;

      this.template = arr1;
      var that = this;
      this.output = this.template.map(function (a, i) {
        return that.buildOutput(i);
      });
      this.output.forEach(function (a, i) {
        if (i + 1 == _this.output.length) {
          process.stdout.write(a);
        } else {
          process.stdout.write(a + "\n");
          _this.line = _this.line + 1;
        }
      });
      process.stdout.on('resize', this.resize);
      this.isSetup = true;
    }
  }, {
    key: "resize",
    value: function resize() {
      var _this2 = this;

      this.output.forEach(function (a, i) {
        if (process.stdout.rows >= _this2.output.length - i) {
          _this2.clear(i);

          _this2.render(i);
        }
      });
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

      if (this.isSetup && this.enabled) {
        this.values = new Map([].concat(_toConsumableArray(this.values), _toConsumableArray(attributes)));
        this.checkDiff();
      }
    }
  }, {
    key: "checkDiff",
    value: function checkDiff() {
      var difs = [];
      var that = this;
      this.template.forEach(function (a, i) {
        var line = i;
        var build = that.buildOutput(line);

        if (build !== that.output[i]) {
          that.output[i] = build;
          difs.push(line);
        }
      });

      for (var _i = 0, _difs = difs; _i < _difs.length; _i++) {
        var a = _difs[_i];

        if (process.stdout.rows >= this.output.length - a) {
          this.clear(a);
          this.render(a);
        }
      }
    }
  }, {
    key: "render",
    value: function render(line) {
      if (this.enabled) {
        var m = this.goTo(line);
        process.stdout.write(this.output[line]);
        this.changeLine(m);
      }
    }
  }, {
    key: "clear",
    value: function clear(line) {
      if (this.enabled && this.isSetup) {
        var m = this.goTo(line);
        process.stdout.clearLine(0);
        this.changeLine(m);
      }
    }
  }, {
    key: "buildOutput",
    value: function buildOutput(line) {
      var data = this.template[line];
      return data.map(function (a) {
        if (typeof a == 'function') {
          return a();
        }

        return a;
      }).join('');
    }
  }, {
    key: "exit",
    value: function exit() {
      process.stdout.removeListener('resize', this.resize);
      this.enabled = false;
      this.goTo(0);
      process.stdout.clearLine(0);
      process.stdout.clearScreenDown();
    }
  }, {
    key: "goTo",
    value: function goTo(line) {
      var m = this.line - line;
      process.stdout.moveCursor(0, m * -1);
      process.stdout.cursorTo(0);
      this.line = this.line - m;
      return m;
    }
  }, {
    key: "changeLine",
    value: function changeLine(x) {
      process.stdout.moveCursor(0, x);
      this.line = this.line + x;
    }
  }]);

  return EntoliOutput;
}();

exports.EntoliOutput = EntoliOutput;