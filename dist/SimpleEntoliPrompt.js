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

var SimpleEntoliPrompt = function SimpleEntoliPrompt(str) {
  var _this = this;

  _classCallCheck(this, SimpleEntoliPrompt);

  this.prompt = str;
  return function () {
    _this.answer = '';
    _this.position = 0;
    return new Promise(function (resolve, reject) {
      var s = new _EntoliOutput.EntoliOutput([['text', '']]);
      s.setup([[_this.prompt, ' ', function () {
        return _chalk.default.green(s.get('text'));
      }]]);
      process.stdout.cursorTo(_this.prompt.length + _this.position + 1);
      new _EntolInterface.default({
        exit: function exit() {
          s.exit();
        },
        enter: function enter() {
          s.exit();
          process.stdout.write("Wrote: " + _chalk.default.blue(_this.answer) + '\n');
          resolve(_this.answer);
        },
        update: function update(str, key) {
          var name = key.name;
          if (str == undefined && name != 'left' && name != 'right') return;

          if (name == 'backspace') {
            var a = _this.answer.split('');

            a.splice(_this.position - 1, 1);
            _this.answer = a.join('');
            _this.position -= 1;
          } else if (name == 'left') {
            _this.position -= 1;
          } else if (name == 'right') {
            _this.position += 1;
          } else {
            var _a = _this.answer.split('');

            _a.splice(_this.position, 0, str);

            _this.answer = _a.join('');
            _this.position += str.length;
          }

          if (_this.position < 0) {
            _this.position = 0;
          }

          if (_this.position >= _this.answer.length) {
            _this.position = _this.answer.length;
          }

          s.update([['text', _this.answer]]);
          process.stdout.cursorTo(_this.prompt.length + _this.position + 1);
        },
        hideCursor: false
      });
    });
  };
};

exports.default = SimpleEntoliPrompt;