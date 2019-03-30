"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _EntoliOutput = require("./EntoliOutput");

var _readline = _interopRequireDefault(require("readline"));

var _chalk = _interopRequireDefault(require("chalk"));

var _EntolInterface = _interopRequireDefault(require("./EntolInterface"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EntoliList = function EntoliList(items) {
  var _this = this;

  _classCallCheck(this, EntoliList);

  this.items = items;
  return function () {
    _this.index = 0;
    return new Promise(function (resolve, reject) {
      var s = new _EntoliOutput.EntoliOutput([].concat(_toConsumableArray(_this.items.map(function (a, i) {
        return ['index' + i, i];
      })), [['selection', _this.items[0][0]], ['selected', 0]]));
      s.setup([["Select an option"]].concat(_toConsumableArray(_this.items.map(function (a, i) {
        return ['    ', function () {
          return s.get('selected') === i ? _chalk.default.green('*') : '-';
        }, ') ', a[0]];
      })), [["Current Selection: ", function () {
        return _chalk.default.green(s.get('selection'));
      }]]));
      new _EntolInterface.default({
        exit: function exit() {
          s.exit();
        },
        enter: function enter() {
          s.exit();
          process.stdout.write("Selected option: " + _chalk.default.blue(_this.items[_this.index][0]) + '\n');
          resolve(_this.items[_this.index]);
        },
        update: function update(str, key) {
          if (key.name == 'up') {
            _this.index--;
          }

          if (key.name == 'down') {
            _this.index++;
          }

          if (_this.index >= _this.items.length) {
            _this.index = 0;
          }

          if (_this.index < 0) {
            _this.index = _this.items.length - 1;
          }

          s.update([['selected', _this.index], ['selection', _this.items[_this.index][0]]]);
        }
      });
    });
  };
};

exports.default = EntoliList;