"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EntoliConfirm;

var _EntoliOutput = require("./EntoliOutput");

var _chalk = _interopRequireDefault(require("chalk"));

var _EntolInterface = _interopRequireDefault(require("./EntolInterface"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EntoliConfirm(promptDefault) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$enterMessage = _ref.enterMessage,
      enterMessage = _ref$enterMessage === void 0 ? true : _ref$enterMessage,
      _ref$defaultReturn = _ref.defaultReturn,
      defaultReturn = _ref$defaultReturn === void 0 ? true : _ref$defaultReturn,
      _ref$exitMessage = _ref.exitMessage,
      exitMessage = _ref$exitMessage === void 0 ? true : _ref$exitMessage,
      _ref$preventExit = _ref.preventExit,
      preventExit = _ref$preventExit === void 0 ? false : _ref$preventExit;

  var prompt = promptDefault;
  var answer = '';
  var dreturn = defaultReturn;
  return function () {
    var optional = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    enterMessage = optional.enterMessage === true ? true : optional.enterMessage === false ? false : enterMessage;
    exitMessage = optional.exitMessage === true ? true : optional.exitMessage === false ? false : exitMessage;
    preventExit = optional.preventExit === true ? true : optional.preventExit === false ? false : preventExit;

    if (optional.prompt) {
      prompt = optional.prompt;
    } else {
      prompt = promptDefault;
    }

    if (optional.answer) {
      answer = optional.answer;
    } else {
      answer = '';
    }

    if (optional.defaultReturn) {
      dreturn = optional.defaultReturn;
    } else {
      dreturn = defaultReturn;
    }

    var position = answer.length;
    return new Promise(function (resolve, reject) {
      try {
        var confirm = dreturn;
        var s = new _EntoliOutput.EntoliOutput([['text', answer], ['confirm', dreturn]]);
        s.setup([[prompt, ' (', function () {
          return s.get('confirm') === true ? _chalk.default.green('Y') : 'y';
        }, '/', function () {
          return s.get('confirm') === false ? _chalk.default.green('N') : 'n';
        }, ')', function () {
          return _chalk.default.green(s.get('text'));
        }]]);
        process.stdout.cursorTo(prompt.length + position + 1 + 5);
        new _EntolInterface.default({
          exit: function exit() {
            s.exit();
            resolve();
          },
          enter: function enter() {
            s.exit();
            if (enterMessage) process.stdout.write("Wrote: " + (confirm === null ? dreturn : confirm).toString() + '\n');
            resolve(confirm === null ? dreturn : confirm);
          },
          update: function update(str, key) {
            var name = key.name;
            if (str == undefined && name != 'left' && name != 'right') return;

            if (name == 'backspace') {
              if (position - 1 >= 0) {
                var a = answer.split('');
                a.splice(position - 1, 1);
                answer = a.join('');
                position -= 1;
              }
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

            var accept = ['y', 'ye', 'yes'];
            var deny = ['n', 'no'];

            if (accept.includes(answer.toLowerCase())) {
              confirm = true;
            } else if (deny.includes(answer.toLowerCase())) {
              confirm = false;
            } else {
              confirm = null;
            }

            s.update([['text', answer], ['confirm', confirm === null ? dreturn : confirm]]);
            process.stdout.cursorTo(prompt.length + position + 1 + 5);
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