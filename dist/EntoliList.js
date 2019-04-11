"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EntoliList;

var _EntoliOutput = require("./EntoliOutput");

var _chalk = _interopRequireDefault(require("chalk"));

var _EntolInterface = _interopRequireDefault(require("./EntolInterface"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function EntoliList(items) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$enterMessage = _ref.enterMessage,
      enterMessage = _ref$enterMessage === void 0 ? true : _ref$enterMessage,
      _ref$exitMessage = _ref.exitMessage,
      exitMessage = _ref$exitMessage === void 0 ? true : _ref$exitMessage,
      _ref$preventExit = _ref.preventExit,
      preventExit = _ref$preventExit === void 0 ? false : _ref$preventExit;

  return function () {
    var index = 0;
    return new Promise(function (resolve, reject) {
      try {
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
            resolve();
          },
          enter: function enter() {
            s.exit();
            if (enterMessage) process.stdout.write("Selected option: " + _chalk.default.blue(items[index][0]) + '\n');
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
          },
          exitMessage: exitMessage,
          preventExit: preventExit
        });
      } catch (e) {
        reject(e);
      }
    });
  };
}