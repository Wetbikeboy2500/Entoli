"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _EntoliOutput = require("./EntoliOutput");

var _chalk = _interopRequireDefault(require("chalk"));

var _EntolInterface = _interopRequireDefault(require("./EntolInterface"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EntoliListMulti = function EntoliListMulti(items) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  _classCallCheck(this, EntoliListMulti);

  var _options$enterMessage = options.enterMessage,
      enterMessage = _options$enterMessage === void 0 ? true : _options$enterMessage,
      _options$exitMessage = options.exitMessage,
      exitMessage = _options$exitMessage === void 0 ? true : _options$exitMessage,
      _options$preventExit = options.preventExit,
      preventExit = _options$preventExit === void 0 ? false : _options$preventExit;
  items.push(['Confirm', '***cof*']);
  return function () {
    var index = 0;
    var selected = [];
    return new Promise(function (resolve, reject) {
      try {
        var s = new _EntoliOutput.EntoliOutput([['selected', []], ['index', 0], ['selection', '']]);
        s.setup([['Select an option']].concat(_toConsumableArray(items.map(function (a, i) {
          return [function () {
            return s.get('index') == i ? _chalk["default"].blue('    > ') : '      ';
          }, function () {
            return s.get('selected').includes(i) ? _chalk["default"].green(a[0]) : a[0];
          }];
        })), [['Current Selections: ', function () {
          return _chalk["default"].green(s.get('selection'));
        }]]));
        var r = new _EntolInterface["default"]({
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
};

exports["default"] = EntoliListMulti;