"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntoliIndent = exports.EntoliDivider = void 0;

var EntoliDivider = function EntoliDivider() {
  return EntoliIndent() + '__________';
};

exports.EntoliDivider = EntoliDivider;

var EntoliIndent = function EntoliIndent() {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return '    '.repeat(a);
};

exports.EntoliIndent = EntoliIndent;