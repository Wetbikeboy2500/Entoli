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
    return new Promise(function (resolve, reject) {
      var s = new _EntoliOutput.EntoliOutput([['text', ''], ['shown', true]]);
      s.setup([[_this.prompt, ' ', function () {
        return _chalk.default.green(s.get('text'));
      }, function () {
        return s.get('shown') ? _chalk.default.bgWhite(' ') : '';
      }]]);
      new _EntolInterface.default({
        exit: function exit() {
          s.exit();
        },
        preenter: function preenter() {
          s.update([['shown', false]]);
        },
        enter: function enter() {
          s.exit();
          resolve(_this.answer.trim());
        },
        update: function update(str, key) {
          if (str == undefined) return;

          if (key.name == 'backspace') {
            _this.answer = _this.answer.substring(0, _this.answer.length - 1);
          } else {
            _this.answer += str;
          }

          s.update([['text', _this.answer]]);
        }
      });
    });
  };
};

exports.default = SimpleEntoliPrompt;