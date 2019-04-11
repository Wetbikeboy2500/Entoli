"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EntoliMultiPrompt;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function EntoliMultiPrompt(_x) {
  return _EntoliMultiPrompt.apply(this, arguments);
}

function _EntoliMultiPrompt() {
  _EntoliMultiPrompt = _asyncToGenerator(regeneratorRuntime.mark(function _callee(arr) {
    var response, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, a;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            response = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 4;
            _iterator = arr[Symbol.iterator]();

          case 6:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 16;
              break;
            }

            a = _step.value;
            _context.t0 = response;
            _context.next = 11;
            return a();

          case 11:
            _context.t1 = _context.sent;

            _context.t0.push.call(_context.t0, _context.t1);

          case 13:
            _iteratorNormalCompletion = true;
            _context.next = 6;
            break;

          case 16:
            _context.next = 22;
            break;

          case 18:
            _context.prev = 18;
            _context.t2 = _context["catch"](4);
            _didIteratorError = true;
            _iteratorError = _context.t2;

          case 22:
            _context.prev = 22;
            _context.prev = 23;

            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }

          case 25:
            _context.prev = 25;

            if (!_didIteratorError) {
              _context.next = 28;
              break;
            }

            throw _iteratorError;

          case 28:
            return _context.finish(25);

          case 29:
            return _context.finish(22);

          case 30:
            return _context.abrupt("return", response);

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 18, 22, 30], [23,, 25, 29]]);
  }));
  return _EntoliMultiPrompt.apply(this, arguments);
}