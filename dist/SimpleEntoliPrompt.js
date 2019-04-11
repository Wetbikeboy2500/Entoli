"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SimpleEntoliPrompt;

var _EntoliOutput = require("./EntoliOutput");

var _EntolInterface = _interopRequireDefault(require("./EntolInterface"));

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SimpleEntoliPrompt(prompt) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$enterMessage = _ref.enterMessage,
      enterMessage = _ref$enterMessage === void 0 ? true : _ref$enterMessage,
      _ref$exitMessage = _ref.exitMessage,
      exitMessage = _ref$exitMessage === void 0 ? true : _ref$exitMessage,
      _ref$preventExit = _ref.preventExit,
      preventExit = _ref$preventExit === void 0 ? false : _ref$preventExit;

  return function () {
    var answer = '';
    var position = 0;
    return new Promise(function (resolve, reject) {
      try {
        var s = new _EntoliOutput.EntoliOutput([['text', '']]);
        s.setup([[prompt, ' ', function () {
          return _chalk.default.green(s.get('text'));
        }]]);
        process.stdout.cursorTo(prompt.length + position + 1);
        new _EntolInterface.default({
          exit: function exit() {
            s.exit();
            resolve();
          },
          enter: function enter() {
            s.exit();
            if (enterMessage) process.stdout.write("Wrote: " + _chalk.default.blue(answer) + '\n');
            resolve(answer);
          },
          update: function update(str, key) {
            var name = key.name;
            if (str == undefined && name != 'left' && name != 'right') return;

            if (name == 'backspace') {
              var a = answer.split('');
              a.splice(position - 1, 1);
              answer = a.join('');
              position -= 1;
            } else if (name == 'left') {
              position -= 1;
            } else if (name == 'right') {
              position += 1;
            } else {
              var _a = answer.split('');

              _a.splice(position, 0, str);

              answer = _a.join('');
              position += str.length;
            }

            if (position < 0) {
              position = 0;
            }

            if (position >= answer.length) {
              position = answer.length;
            }

            s.update([['text', answer]]);
            process.stdout.cursorTo(prompt.length + position + 1);
          },
          hideCursor: false,
          exitMessage: exitMessage,
          preventExit: preventExit
        });
      } catch (e) {
        reject(e);
      }
    });
  };
}