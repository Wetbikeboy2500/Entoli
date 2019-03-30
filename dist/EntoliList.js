"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _EntoliOutput = require("./EntoliOutput");

var _chalk = _interopRequireDefault(require("chalk"));

var _EntolInterface = _interopRequireDefault(require("./EntolInterface"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EntoliList = function EntoliList(items) {
  _classCallCheck(this, EntoliList);

  return function () {
    var index = 0;
    return new Promise(function (resolve, reject) {
      var s = new _EntoliOutput.EntoliOutput([].concat(_toConsumableArray(items.map(function (a, i) {
        return ['index' + i, i];
      })), [['selection', items[0][0]], ['selected', 0]]));
      s.setup([["Select an option"]].concat(_toConsumableArray(items.map(function (a, i) {
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
          process.stdout.write("Selected option: " + _chalk.default.blue(items[index][0]) + '\n');
          resolve(items[index]);
        },
        update: function update(str, key) {
          if (key.name == 'up') {
            index--;
          }

          if (key.name == 'down') {
            index++;
          }

          if (index >= items.length) {
            index = 0;
          }

          if (index < 0) {
            index = items.length - 1;
          }

          s.update([['selected', index], ['selection', items[index][0]]]);
        }
      });
    });
  };
};

exports.default = EntoliList;