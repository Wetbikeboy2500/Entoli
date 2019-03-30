"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _EntoliOutput = require("./EntoliOutput");

var _EntolInterface = _interopRequireDefault(require("./EntolInterface"));

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SimpleEntoliPrompt = function SimpleEntoliPrompt(prompt) {
  _classCallCheck(this, SimpleEntoliPrompt);

  return function () {
    var answer = '';
    var position = 0;
    return new Promise(function (resolve, reject) {
      var s = new _EntoliOutput.EntoliOutput([['text', '']]);
      s.setup([[prompt, ' ', function () {
        return _chalk.default.green(s.get('text'));
      }]]);
      process.stdout.cursorTo(prompt.length + position + 1);
      new _EntolInterface.default({
        exit: function exit() {
          s.exit();
        },
        enter: function enter() {
          s.exit();
          process.stdout.write("Wrote: " + _chalk.default.blue(answer) + '\n');
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
        hideCursor: false
      });
    });
  };
};

exports.default = SimpleEntoliPrompt;