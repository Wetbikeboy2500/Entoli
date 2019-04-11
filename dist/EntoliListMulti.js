"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EntoliListMulti;

var _EntoliOutput = require("./EntoliOutput");

var _chalk = _interopRequireDefault(require("chalk"));

var _EntolInterface = _interopRequireDefault(require("./EntolInterface"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function EntoliListMulti(items, _ref) {
  var _ref$enterMessage = _ref.enterMessage,
      enterMessage = _ref$enterMessage === void 0 ? true : _ref$enterMessage,
      _ref$exitMessage = _ref.exitMessage,
      exitMessage = _ref$exitMessage === void 0 ? true : _ref$exitMessage,
      _ref$preventExit = _ref.preventExit,
      preventExit = _ref$preventExit === void 0 ? false : _ref$preventExit;
  items.push(['Confirm', '***cof*']);
  return function () {
    var index = 0;
    var selected = [];
    return new Promise(function (resolve, reject) {
      try {
        var s = new _EntoliOutput.EntoliOutput([['selected', []], ['index', 0], ['selection', '']]);
        s.setup([['Select an option']].concat(_toConsumableArray(items.map(function (a, i) {
          return [function () {
            return s.get('index') == i ? _chalk.default.blue('    > ') : '      ';
          }, function () {
            return s.get('selected').includes(i) ? _chalk.default.green(a[0]) : a[0];
          }];
        })), [['Current Selections: ', function () {
          return _chalk.default.green(s.get('selection'));
        }]]));
        var r = new _EntolInterface.default({
          exit: function exit() {
            s.exit();
            resolve();
          },
          catchEnter: false,
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

            if (key.name == 'return') {
              if (items[index][1] == '***cof*') {
                r.stop();
                s.exit();
                if (enterMessage) process.stdout.write('Selected Options: ' + selected.map(function (a) {
                  return items[a][0];
                }).join(', ') + '\n');
                resolve(selected.map(function (a) {
                  return items[a];
                }));
                return;
              }

              if (!selected.includes(index)) {
                selected.push(index);
              } else {
                selected.splice(selected.findIndex(function (a) {
                  return a == index;
                }), 1);
              }
            }

            s.update([['index', index], ['selected', selected], ['selection', selected.map(function (a) {
              return items[a][0];
            }).join(', ')]]);
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