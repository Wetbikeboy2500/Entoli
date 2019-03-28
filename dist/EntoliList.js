"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntoliList = void 0;

var _EntoliOutput = require("./EntoliOutput");

var _readline = _interopRequireDefault(require("readline"));

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EntoliList = function () {
  function EntoliList(items) {
    _classCallCheck(this, EntoliList);

    this.items = items;
    this.index = 0;
  }

  _createClass(EntoliList, [{
    key: "start",
    value: function start() {
      var that = this;
      return new Promise(function (resolve, reject) {
        process.stdin.removeAllListeners();

        _readline.default.emitKeypressEvents(process.stdin);

        process.stdin.setRawMode(true);
        process.stderr.write('\x1B[?25l');
        var s = new _EntoliOutput.EntoliOutput([].concat(_toConsumableArray(that.items.map(function (a, i) {
          return ['index' + i, i];
        })), [['selection', 'null'], ['selected', 0]]));
        s.setup([["Select an option"]].concat(_toConsumableArray(that.items.map(function (a, i) {
          return ['    ', function () {
            return s.get('selected') === i ? _chalk.default.green('*') : '-';
          }, ') ', a[0]];
        })), [["Current Selection: ", function () {
          return _chalk.default.green(s.get('selection'));
        }]]));
        process.stdin.on('keypress', function (str, key) {
          if (key.ctrl && key.name === 'c') {
            process.stderr.write('\x1B[?25h');
            s.exit();
            process.stdin.setRawMode(false);
            process.stdout.write('Exited the object');
            process.exit();
          } else if (key.name == 'return') {
            process.stderr.write('\x1B[?25h');
            s.exit();
            process.stdin.setRawMode(false);
            process.stdout.write("Selected option: " + _chalk.default.blue(that.items[that.index][0]));
            process.stdout.moveCursor(0, 1);
            process.stdout.cursorTo(0);
            process.stdin.removeAllListeners();
            resolve(that.items[that.index][1]);
          } else {
            if (key.name == 'up') {
              that.index--;
            }

            if (key.name == 'down') {
              that.index++;
            }

            if (that.index >= that.items.length) {
              that.index = 0;
            }

            if (that.index < 0) {
              that.index = that.items.length - 1;
            }

            s.update([['selected', that.index], ['selection', that.items[that.index][0]]]);
          }
        });
      });
    }
  }]);

  return EntoliList;
}();

exports.EntoliList = EntoliList;