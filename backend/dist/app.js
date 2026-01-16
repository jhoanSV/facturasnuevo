"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _morgan = _interopRequireDefault(require("morgan"));
var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _SwaggerOptions = require("./SwaggerOptions");
var _routes = _interopRequireDefault(require("./Routes/routes"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var specs = (0, _swaggerJsdoc["default"])(_SwaggerOptions.options);
// * try the HTTPS request
/*const https = require('https');
const path = require('path');
const fs = require('fs');

const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
},app
)

sslServer.listen(443, () => console.log('server listening on port 443'))*/
// * try the HTTPS request

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
app.use(_routes["default"]);
app.use('/docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(specs));
var _default = exports["default"] = app;