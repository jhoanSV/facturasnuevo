"use strict";

var _app = _interopRequireDefault(require("./app"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//const serverless = require("serverless-http")

_app["default"].listen(5000);
console.log('server listening on port 5000');