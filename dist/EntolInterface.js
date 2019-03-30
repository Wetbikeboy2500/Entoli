"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _readline = _interopRequireDefault(require("readline"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EntoliInterface = function () {
  function EntoliInterface(_ref) {
    var _this = this;

    var update = _ref.update,
        enter = _ref.enter,
        _ref$preenter = _ref.preenter,
        preenter = _ref$preenter === void 0 ? null : _ref$preenter,
        exit = _ref.exit,
        _ref$hideCursor = _ref.hideCursor,
        hideCursor = _ref$hideCursor === void 0 ? true : _ref$hideCursor,
        _ref$catchEnter = _ref.catchEnter,
        catchEnter = _ref$catchEnter === void 0 ? true : _ref$catchEnter;

    _classCallCheck(this, EntoliInterface);

    this.hideCursor = hideCursor;
    this.start();
    process.stdin.on('keypress', function (str, key) {
      if (key.ctrl && key.name === 'c') {
        exit();

        _this.exit();
      } else if (key.name == 'return' && catchEnter) {
        if (preenter) preenter();

        _this.stop();

        enter();
      } else {
        update(str, key);
      }
    });
  }

  _createClass(EntoliInterface, [{
    key: "start",
    value: function start() {
      process.stdin.resume();

      _readline.default.emitKeypressEvents(process.stdin);

      process.stdin.setRawMode(true);
      if (this.hideCursor) process.stderr.write('\x1B[?25l');
    }
  }, {
    key: "stop",
    value: function stop() {
      process.stderr.write('\x1B[?25h');
      process.stdin.setRawMode(false);
      process.stdout.moveCursor(0, 1);
      process.stdout.cursorTo(0);
      process.stdin.removeAllListeners(['keypress']);
      process.stdin.pause();
    }
  }, {
    key: "exit",
    value: function exit() {
      process.stderr.write('\x1B[?25h');
      process.stdin.setRawMode(false);
      process.stdout.write('Exited the object');
      process.exit();
    }
  }]);

  return EntoliInterface;
}();

exports.default = EntoliInterface;