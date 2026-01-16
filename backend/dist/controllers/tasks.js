"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateOrder = exports.quiantityProductList = exports.quiantityAndDisponible = exports.postUpdateWorker = exports.postUpdateSupplier = exports.postUpdateSubCategory = exports.postUpdatePurchase = exports.postUpdateProduct = exports.postUpdateClient = exports.postUpdateCategory = exports.postStateFlow = exports.postOtherSupplier = exports.postOntheRoute = exports.postNewWorker = exports.postNewSupplier = exports.postNewSubCategory = exports.postNewSale = exports.postNewPurchase = exports.postNewProduct = exports.postNewClient = exports.postNewCategory = exports.postNewAlias = exports.postMakePP = exports.postDeteleSubCategory = exports.postDeteleCategory = exports.postDeletePP = exports.postDeleteAlias = exports.postCloseOrder = exports.postChangePermits = exports.postChangePassword = exports.postAnuul = exports.postAllowedList = exports.postAllowed = exports.getWorkerList = exports.getWeekly = exports.getSupplierList = exports.getSubCategoryList = exports.getStatusList = exports.getSpecificPurchase = exports.getRoutesList = exports.getPurchaseList = exports.getProductList = exports.getPreparationList = exports.getPendingList = exports.getPartialPaymentPurchase = exports.getPPSalesBalances = exports.getPPSales = exports.getPPPurchase = exports.getOrderHeader = exports.getOrderDetail = exports.getEntrantsList = exports.getEnteredList = exports.getCreditNotes = exports.getClientList = exports.getClasesList = exports.getCategoryList = exports.getAliasList = exports.getAdvisorsList = exports.checkLogInData = exports.CoordinatesPagesList = void 0;
var _database = require("../database");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
//import jwt from 'jsonwebtoken';
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetch = require('node-fetch');

//Todo: Function for checking if the data of connection is correct.
var checkLogInData = exports.checkLogInData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var connection, _yield$connection$que, _yield$connection$que2, rows, dbPassword;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context.sent;
          _context.next = 6;
          return connection.query("SELECT\n                                                Col.Cod,\n                                                Col.Nombre,\n                                                Col.Apellido,\n                                                Col.Cargo,\n                                                Col.Usuario,\n                                                Col.Contrase\xF1a\n                                            FROM\n                                                colaboradores AS Col\n                                            WHERE Col.Usuario = ? AND Col.Activo = '1'", [req.body.User]);
        case 6:
          _yield$connection$que = _context.sent;
          _yield$connection$que2 = _slicedToArray(_yield$connection$que, 1);
          rows = _yield$connection$que2[0];
          connection.end();
          // Check if the password matches with the password that the user gave
          if (rows.length > 0) {
            dbPassword = rows[0].Contraseña; // Use index 0 to access the first row
            bcrypt.compare(req.body.Password, dbPassword, function (err, result) {
              if (err) {
                // Handle error
                //console.error(err);
                res.status(500).json({
                  error: 'Internal Server Error'
                });
              } else if (result) {
                // Passwords match
                delete rows[0].Contraseña;
                res.json(rows[0]);
              } else {
                // Passwords do not match
                res.status(401).json({
                  error: 'Unauthorized'
                });
              }
              //connection.end();
            });
          } else {
            // No user found with the provided email
            res.status(404).json({
              error: 'User not found'
            });
          }
          _context.next = 17;
          break;
        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          console.error('entro en este' & _context.t0);
          res.status(500).json({
            error: 'Internal Server Error'
          });
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 13]]);
  }));
  return function checkLogInData(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getRoutesList = exports.getRoutesList = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var connection, _yield$connection$que3, _yield$connection$que4, rows;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context2.sent;
          _context2.next = 6;
          return connection.query("SELECT\n                                                    CodRuta,\n                                                    nombreRuta\n                                                FROM\n                                                    rutas");
        case 6:
          _yield$connection$que3 = _context2.sent;
          _yield$connection$que4 = _slicedToArray(_yield$connection$que3, 1);
          rows = _yield$connection$que4[0];
          res.json(rows);
          connection.end();
          _context2.next = 16;
          break;
        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          console.log('Error-getClientList: ', _context2.t0);
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 13]]);
  }));
  return function getRoutesList(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getAdvisorsList = exports.getAdvisorsList = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var connection, _yield$connection$que5, _yield$connection$que6, rows;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context3.sent;
          _context3.next = 6;
          return connection.query("SELECT\n                                                    co.Cod,\n                                                    co.Nombre\n                                                FROM\n                                                    colaboradores AS co\n                                                WHERE\n                                                    co.Cargo = 'Asesor comercial' AND co.Activo = 1");
        case 6:
          _yield$connection$que5 = _context3.sent;
          _yield$connection$que6 = _slicedToArray(_yield$connection$que5, 1);
          rows = _yield$connection$que6[0];
          res.json(rows);
          connection.end();
          _context3.next = 16;
          break;
        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          console.log('Error-getClientList: ', _context3.t0);
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 13]]);
  }));
  return function getAdvisorsList(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
function encriptSync(password) {
  var saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
}

//!Cliente
var getClientList = exports.getClientList = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var connection, _yield$connection$que7, _yield$connection$que8, rows;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context4.sent;
          _context4.next = 6;
          return connection.query("SELECT\n                                                    cli.Cod,\n                                                    cli.Nit,\n                                                    cli.Ferreteria,\n                                                    cli.Contacto,\n                                                    cli.Telefono,\n                                                    cli.Cel,\n                                                    cli.Email,\n                                                    cli.Direccion,\n                                                    cli.Barrio,\n                                                    cli.Ruta AS CodRuta,\n                                                    ru.nombreRuta,\n                                                    cli.CodVendedor,\n                                                    col.Nombre AS Vendedor,\n                                                    cli.Nota,\n                                                    cli.VerificacionNit,\n                                                    cli.Geolocalizacion,\n                                                    cli.Estado,\n                                                    cli.Iva,\n                                                    cli.Pos,\n                                                    cli.ElectronicPos,\n                                                    cli.Tipo,\n                                                    cli.ResFiscal,\t\n                                                    IFNULL(res.NumeroResolucion,'') AS NumeroResolucion,\n                                                    IFNULL(res.FechaInicio,'') AS FechaInicio,\n                                                    IFNULL(res.FechaFinal,'') AS FechaFinal,\n                                                    IFNULL(res.Prefijo,'') AS Prefijo,\n                                                    IFNULL(res.NumeroInicial,'') AS NumeroInicial,\n                                                    IFNULL(res.NumeroFinal,'') AS NumeroFinal,\n                                                    IFNULL(res.ClaveTecnica,'') AS ClaveTecnica,\n                                                    IFNULL(res.Api,'') AS Api,\n                                                    IFNULL(res.Usuario,'') AS Usuario,\n                                                    IFNULL(res.Clave,'') AS Clave,\n                                                    cli.Nota\n                                                FROM\n                                                    clientes AS cli\n                                                LEFT JOIN\n                                                    resoluciones AS res ON res.IdFerreteria = cli.Cod\n                                                LEFT JOIN\n                                                    rutas AS ru ON cli.Ruta = ru.codRuta\n                                                LEFT JOIN\n                                                    colaboradores AS col ON cli.CodVendedor = col.Cod");
        case 6:
          _yield$connection$que7 = _context4.sent;
          _yield$connection$que8 = _slicedToArray(_yield$connection$que7, 1);
          rows = _yield$connection$que8[0];
          res.json(rows);
          connection.end();
          _context4.next = 16;
          break;
        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](0);
          console.log('Error-getClientList: ', _context4.t0);
        case 16:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 13]]);
  }));
  return function getClientList(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var postNewClient = exports.postNewClient = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var connection, contraseña, _yield$connection$que9, _yield$connection$que10, NewClient, _yield$connection$que11, _yield$connection$que12, ConsecutivoRow, Consecutivo, _yield$connection$que13, _yield$connection$que14, NewEData;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context5.sent;
          _context5.prev = 3;
          contraseña = encriptSync('123456');
          _context5.next = 7;
          return connection.query("INSERT INTO clientes (\n                                                                    Nit,\n                                                                    Ferreteria,\n                                                                    Contacto,\n                                                                    Telefono,\n                                                                    Cel,\n                                                                    Email,\n                                                                    Direccion,\n                                                                    Barrio,\n                                                                    Ruta,\n                                                                    CodVendedor,\n                                                                    Nota,\n                                                                    verificacionNit,\n                                                                    Geolocalizacion,\n                                                                    Contrase\xF1a,\n                                                                    Estado,\n                                                                    Iva,\n                                                                    Pos,\n                                                                    Tipo,\n                                                                    ResFiscal,\n                                                                    ElectronicPos)\n                                                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.NitCC, req.body.Ferreteria, req.body.Contacto, req.body.Telefono, req.body.Celular, req.body.Email, req.body.Direccion, req.body.Barrio, req.body.CodRuta, req.body.CodVendedor, req.body.Nota, req.body.CV, req.body.Geolocalizacion, contraseña, 'OPERANDO', req.body.Iva, req.body.Pos, req.body.TDocumento, req.body.ResFiscal, req.body.ElectronicPos]);
        case 7:
          _yield$connection$que9 = _context5.sent;
          _yield$connection$que10 = _slicedToArray(_yield$connection$que9, 1);
          NewClient = _yield$connection$que10[0];
          _context5.next = 12;
          return connection.query("SELECT \n                                                            MAX(Cod) AS Cod\n                                                        FROM\n                                                            clientes");
        case 12:
          _yield$connection$que11 = _context5.sent;
          _yield$connection$que12 = _slicedToArray(_yield$connection$que11, 1);
          ConsecutivoRow = _yield$connection$que12[0];
          Consecutivo = ConsecutivoRow[0].Cod;
          if (!(req.body.Pos && req.body.ElectronicPos)) {
            _context5.next = 22;
            break;
          }
          _context5.next = 19;
          return connection.query("INSERT INTO resoluciones (\n                                                                                    IdFerreteria,\n                                                                                    NumeroResolucion,\n                                                                                    FechaInicio,\n                                                                                    FechaFinal,\n                                                                                    Prefijo,\n                                                                                    NumeroInicial,\n                                                                                    NumeroFinal,\n                                                                                    Clavetecnica,\n                                                                                    Api,\n                                                                                    Usuario,\n                                                                                    Clave\n                                                                                    )\n                                                                    VALUES (?,?,?,?,?,?,?,?,?,?,?)", [Consecutivo, req.body.ResFiscalName, req.body.ResFiscal, req.body.NResolucion, req.body.FInicio, req.body.FFinal, req.body.Prefijo, req.body.NInicial, req.body.NFinal, req.body.ClaveTecnica, req.body.Api, req.body.Usuario, req.body.Clave]);
        case 19:
          _yield$connection$que13 = _context5.sent;
          _yield$connection$que14 = _slicedToArray(_yield$connection$que13, 1);
          NewEData = _yield$connection$que14[0];
        case 22:
          res.status(200).json({
            sucess: true,
            error: ''
          });
          _context5.next = 29;
          break;
        case 25:
          _context5.prev = 25;
          _context5.t0 = _context5["catch"](3);
          console.log('Error-getClientList: ', _context5.t0);
          res.status(500).json({
            sucess: false,
            error: _context5.t0
          });
        case 29:
          _context5.prev = 29;
          connection.end();
          return _context5.finish(29);
        case 32:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[3, 25, 29, 32]]);
  }));
  return function postNewClient(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var postUpdateClient = exports.postUpdateClient = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var connection, _yield$connection$que15, _yield$connection$que16, NewClient, _yield$connection$que17, _yield$connection$que18, NewEData, _yield$connection$que19, _yield$connection$que20, _NewEData;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          console.log(req.body);
          _context6.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context6.sent;
          _context6.prev = 4;
          _context6.next = 7;
          return connection.query("UPDATE\n                                                        clientes\n                                                    SET\n                                                        Nit = ?,\n                                                        VerificacionNit = ?, \n                                                        Ferreteria = ?,\n                                                        Contacto = ?,\n                                                        Telefono = ?,\n                                                        Cel = ?,\n                                                        Email = ?,\n                                                        Direccion = ?,\n                                                        Barrio = ?,\n                                                        Ruta = ?,\n                                                        CodVendedor = ?,\n                                                        Geolocalizacion = ?,\n                                                        Nota = ?,\n                                                        Estado = ?,\n                                                        Iva = ?,\n                                                        Pos = ?,\n                                                        Tipo = ?,\n                                                        ResFiscal = ?,\n                                                        ElectronicPos = ?,\n                                                        Tipo = ?\n                                                    Where\n                                                        Cod = ?", [req.body.NitCC, req.body.CV, req.body.Ferreteria, req.body.Contacto, req.body.Telefono, req.body.Celular, req.body.Email, req.body.Direccion, req.body.Barrio, req.body.CodRuta, req.body.CodVendedor, req.body.Geolocalizacion, req.body.Nota, req.body.Estado, req.body.Iva, req.body.Pos, req.body.TDocumento, req.body.ResFiscal, req.body.ElectronicPos, req.body.Tipo === 'Cedula' ? 0 : 1, req.body.Cod]);
        case 7:
          _yield$connection$que15 = _context6.sent;
          _yield$connection$que16 = _slicedToArray(_yield$connection$que15, 1);
          NewClient = _yield$connection$que16[0];
          if (!(req.body.Pos && req.body.ElectronicPos)) {
            _context6.next = 18;
            break;
          }
          _context6.next = 13;
          return connection.query("INSERT INTO resoluciones \n                                                            (\n                                                                IdFerreteria,\n                                                                NumeroResolucion,\n                                                                FechaInicio,\n                                                                FechaFinal,\n                                                                Prefijo,\n                                                                NumeroInicial,\n                                                                NumeroFinal,\n                                                                ClaveTecnica,\n                                                                Api,\n                                                                Usuario,\n                                                                Clave\n                                                            )\n                                                        VALUES (?,\n                                                                ?,\n                                                                ?,\n                                                                ?,\n                                                                ?,\n                                                                ?,\n                                                                ?,\n                                                                ?,\n                                                                ?,\n                                                                ?,\n                                                                ?)\n                                                        ON DUPLICATE KEY UPDATE\n                                                            NumeroResolucion = ?,\n                                                            FechaInicio = ?,\n                                                            FechaFinal = ?,\n                                                            Prefijo = ?,\n                                                            NumeroInicial = ?,\n                                                            NumeroFinal = ?,\n                                                            ClaveTecnica = ?,\n                                                            Api = ?,\n                                                            Usuario = ?,\n                                                            Clave = ?", [req.body.Cod, req.body.NResolucion, req.body.FInicio, req.body.FFinal, req.body.Prefijo, req.body.NInicial, req.body.NFinal, req.body.ClaveTecnica, req.body.Api, req.body.Usuario, req.body.Clave, req.body.NResolucion,
          //Update
          req.body.FInicio, req.body.NFinal, req.body.Prefijo, req.body.NInicial, req.body.NFinal, req.body.ClaveTecnica, req.body.Api, req.body.Usuario, req.body.Clave]);
        case 13:
          _yield$connection$que17 = _context6.sent;
          _yield$connection$que18 = _slicedToArray(_yield$connection$que17, 1);
          NewEData = _yield$connection$que18[0];
          _context6.next = 23;
          break;
        case 18:
          _context6.next = 20;
          return connection.query("DELETE FROM resoluciones\n                                                        WHERE IdFerreteria = ?", [req.body.Cod]);
        case 20:
          _yield$connection$que19 = _context6.sent;
          _yield$connection$que20 = _slicedToArray(_yield$connection$que19, 1);
          _NewEData = _yield$connection$que20[0];
        case 23:
          res.status(200).json({
            sucess: true,
            error: ''
          });
          _context6.next = 30;
          break;
        case 26:
          _context6.prev = 26;
          _context6.t0 = _context6["catch"](4);
          console.log('Error-postUpdateClient: ', _context6.t0);
          res.status(500).json({
            sucess: false,
            error: _context6.t0
          });
        case 30:
          _context6.prev = 30;
          connection.end();
          return _context6.finish(30);
        case 33:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[4, 26, 30, 33]]);
  }));
  return function postUpdateClient(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var getWorkerList = exports.getWorkerList = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var connection, _yield$connection$que21, _yield$connection$que22, rows;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context7.sent;
          _context7.next = 6;
          return connection.query("SELECT\n                                                Col.Cod,\n                                                Col.Nombre,\n                                                Col.Apellido,\n                                                Col.Cargo,\n                                                Col.Telefono,\n                                                Col.Cel,\n                                                Col.Email,\n                                                Col.Direccion,\n                                                Col.Nota,\n                                                Col.Contrase\xF1a,\n                                                Col.Usuario,\n                                                Col.Activo\n                                            FROM\n                                                colaboradores AS Col");
        case 6:
          _yield$connection$que21 = _context7.sent;
          _yield$connection$que22 = _slicedToArray(_yield$connection$que21, 1);
          rows = _yield$connection$que22[0];
          res.json(rows);
          connection.end();
          _context7.next = 16;
          break;
        case 13:
          _context7.prev = 13;
          _context7.t0 = _context7["catch"](0);
          console.log('Error-getWorkerList: ', _context7.t0);
        case 16:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 13]]);
  }));
  return function getWorkerList(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

//!Categry
var getCategoryList = exports.getCategoryList = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var connection, _yield$connection$que23, _yield$connection$que24, rows;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context8.sent;
          _context8.next = 6;
          return connection.query("SELECT\n                                                    ca.IDCategoria,\n                                                    ca.Categoria\n                                                FROM\n                                                    categoria AS ca");
        case 6:
          _yield$connection$que23 = _context8.sent;
          _yield$connection$que24 = _slicedToArray(_yield$connection$que23, 1);
          rows = _yield$connection$que24[0];
          res.json(rows);
          connection.end();
          _context8.next = 16;
          break;
        case 13:
          _context8.prev = 13;
          _context8.t0 = _context8["catch"](0);
          console.log('Error-getCategoryList: ', _context8.t0);
        case 16:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 13]]);
  }));
  return function getCategoryList(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var postNewCategory = exports.postNewCategory = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var connection, _yield$connection$que25, _yield$connection$que26, rows;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context9.sent;
          _context9.prev = 3;
          _context9.next = 6;
          return connection.query("INSERT INTO\n                                                    categoria (categoria, Pag)\n                                                VALUES\n                                                    (?,?)", [req.body.Categoria, '']);
        case 6:
          _yield$connection$que25 = _context9.sent;
          _yield$connection$que26 = _slicedToArray(_yield$connection$que25, 1);
          rows = _yield$connection$que26[0];
          res.status(200).json({
            sucess: true,
            error: ''
          });
          _context9.next = 16;
          break;
        case 12:
          _context9.prev = 12;
          _context9.t0 = _context9["catch"](3);
          res.status(500).json({
            sucess: false,
            error: _context9.t0
          });
          console.log('Error-postNewCategory: ', _context9.t0);
        case 16:
          _context9.prev = 16;
          connection.end();
          return _context9.finish(16);
        case 19:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[3, 12, 16, 19]]);
  }));
  return function postNewCategory(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
var postUpdateCategory = exports.postUpdateCategory = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var connection, _yield$connection$que27, _yield$connection$que28, rows;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context10.sent;
          _context10.prev = 3;
          _context10.next = 6;
          return connection.query("UPDATE\n                                                    categoria\n                                                SET\n                                                    Categoria = ?\n                                                WHERE\n                                                    IDCategoria = ?", [req.body.Categoria, req.body.Cod]);
        case 6:
          _yield$connection$que27 = _context10.sent;
          _yield$connection$que28 = _slicedToArray(_yield$connection$que27, 1);
          rows = _yield$connection$que28[0];
          res.status(200).json({
            sucess: true,
            error: ''
          });
          _context10.next = 16;
          break;
        case 12:
          _context10.prev = 12;
          _context10.t0 = _context10["catch"](3);
          res.status(500).json({
            sucess: false,
            error: _context10.t0
          });
          console.log('Error-postNewCategory: ', _context10.t0);
        case 16:
          _context10.prev = 16;
          connection.end();
          return _context10.finish(16);
        case 19:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[3, 12, 16, 19]]);
  }));
  return function postUpdateCategory(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
var postDeteleCategory = exports.postDeteleCategory = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var connection, _yield$connection$que29, _yield$connection$que30, rows;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context11.sent;
          _context11.prev = 3;
          _context11.next = 6;
          return connection.query("DELETE FROM\n                                                    categoria as cat\n                                                WHERE\n                                                    cat.IDCategoria = ?", [req.body.Cod]);
        case 6:
          _yield$connection$que29 = _context11.sent;
          _yield$connection$que30 = _slicedToArray(_yield$connection$que29, 1);
          rows = _yield$connection$que30[0];
          res.status(200).json({
            sucess: true,
            error: ''
          });
          _context11.next = 16;
          break;
        case 12:
          _context11.prev = 12;
          _context11.t0 = _context11["catch"](3);
          res.status(500).json({
            sucess: false,
            error: _context11.t0
          });
          console.log('Error-postDeteleCategory: ', _context11.t0);
        case 16:
          _context11.prev = 16;
          connection.end();
          return _context11.finish(16);
        case 19:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[3, 12, 16, 19]]);
  }));
  return function postDeteleCategory(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();

//!Subcategory
var getSubCategoryList = exports.getSubCategoryList = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var connection, _yield$connection$que31, _yield$connection$que32, rows;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context12.sent;
          _context12.next = 6;
          return connection.query("SELECT\n                                                    subca.IDSubCategoria,\n                                                    subca.SubCategoria,\n                                                    subca.IDCategoria,\n                                                    ca.Categoria\n                                                FROM\n                                                    subcategorias AS subca\n                                                LEFT JOIN\n                                                    categoria AS ca ON ca.IDCategoria = subca.IDCategoria");
        case 6:
          _yield$connection$que31 = _context12.sent;
          _yield$connection$que32 = _slicedToArray(_yield$connection$que31, 1);
          rows = _yield$connection$que32[0];
          res.json(rows);
          connection.end();
          _context12.next = 16;
          break;
        case 13:
          _context12.prev = 13;
          _context12.t0 = _context12["catch"](0);
          console.log('Error-getSubCategoryList: ', _context12.t0);
        case 16:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 13]]);
  }));
  return function getSubCategoryList(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();
var postNewSubCategory = exports.postNewSubCategory = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var connection, _yield$connection$que33, _yield$connection$que34, rows;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context13.sent;
          _context13.prev = 3;
          _context13.next = 6;
          return connection.query("INSERT INTO\n                                                    subcategorias (SubCategoria, IDCategoria)\n                                                VALUES\n                                                    (?,?)", [req.body.SubCategoria, req.body.IdCategoria]);
        case 6:
          _yield$connection$que33 = _context13.sent;
          _yield$connection$que34 = _slicedToArray(_yield$connection$que33, 1);
          rows = _yield$connection$que34[0];
          res.status(200).json({
            sucess: true,
            error: ''
          });
          _context13.next = 16;
          break;
        case 12:
          _context13.prev = 12;
          _context13.t0 = _context13["catch"](3);
          res.status(500).json({
            sucess: false,
            error: _context13.t0
          });
          console.log('Error-postNewSubCategory: ', _context13.t0);
        case 16:
          _context13.prev = 16;
          connection.end();
          return _context13.finish(16);
        case 19:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[3, 12, 16, 19]]);
  }));
  return function postNewSubCategory(_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();
var postUpdateSubCategory = exports.postUpdateSubCategory = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    var connection, _yield$connection$que35, _yield$connection$que36, rows;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context14.sent;
          _context14.prev = 3;
          _context14.next = 6;
          return connection.query("UPDATE\n                                                    subcategorias\n                                                SET\n                                                    SubCategoria = ?,\n                                                    IDCategoria = ?\n                                                WHERE\n                                                    IDSubCategoria = ?", [req.body.SubCategoria, req.body.IdCategoria, req.body.Cod]);
        case 6:
          _yield$connection$que35 = _context14.sent;
          _yield$connection$que36 = _slicedToArray(_yield$connection$que35, 1);
          rows = _yield$connection$que36[0];
          res.status(200).json({
            sucess: true,
            error: ''
          });
          _context14.next = 16;
          break;
        case 12:
          _context14.prev = 12;
          _context14.t0 = _context14["catch"](3);
          res.status(500).json({
            sucess: false,
            error: _context14.t0
          });
          console.log('Error-postUpdateSubCategory: ', _context14.t0);
        case 16:
          _context14.prev = 16;
          connection.end();
          return _context14.finish(16);
        case 19:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[3, 12, 16, 19]]);
  }));
  return function postUpdateSubCategory(_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}();
var postDeteleSubCategory = exports.postDeteleSubCategory = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
    var connection, _yield$connection$que37, _yield$connection$que38, rows;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context15.sent;
          _context15.prev = 3;
          _context15.next = 6;
          return connection.query("DELETE FROM\n                                                    subcategorias as subcat\n                                                WHERE\n                                                    subcat.IDSubCategoria = ?", [req.body.Cod]);
        case 6:
          _yield$connection$que37 = _context15.sent;
          _yield$connection$que38 = _slicedToArray(_yield$connection$que37, 1);
          rows = _yield$connection$que38[0];
          res.status(200).json({
            sucess: true,
            error: ''
          });
          _context15.next = 16;
          break;
        case 12:
          _context15.prev = 12;
          _context15.t0 = _context15["catch"](3);
          res.status(500).json({
            sucess: false,
            error: _context15.t0
          });
          console.log('Error-postDeteleSubCategory: ', _context15.t0);
        case 16:
          _context15.prev = 16;
          connection.end();
          return _context15.finish(16);
        case 19:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[3, 12, 16, 19]]);
  }));
  return function postDeteleSubCategory(_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}();

//!Products
var getProductList = exports.getProductList = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
    var connection, _yield$connection$que39, _yield$connection$que40, rows;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _context16.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context16.sent;
          _context16.next = 6;
          return connection.query("SELECT\n                                                pPos.Consecutivo,\n                                                pPos.Cod,\n                                                pPos.descripcion,\n                                                p.EsUnidadOpaquete,\n                                                Cat.Categoria,\n                                                SubCat.IDCategoria,\n                                                SubCat.SubCategoria,\n                                                p.SubCategoria AS IdSubCategoria,\n                                                p.CodProovedor,\n                                                prov.Proovedor AS proveedor,\n                                                p.PCosto,\n                                                p.PVenta AS PventaContado,\n                                                p.Pventa1 AS PVentaCredito,\n                                                p.Pventa2 AS PVentaDistribuidor,\n                                                p.Ubicaci\xF3n,\n                                                p.Minimo,\n                                                p.Maximo,\n                                                p.Iva,\n                                                p.Agotado,\n                                                pPos.SVenta,\n                                                pPos.Clase AS IdClase,\n                                                clases.Nombre AS Clase,\n                                                p.ImgName,\n                                                IFNULL(CoorPages.Pag, '') AS Pagina,\n                                                IFNULL(CoorPages.xPosition, '') AS CoordenadaX,\n                                                IFNULL(CoorPages.yPosition, '') AS CoordenadaY,\n                                                p.Nota,\n                                                p.Detalle,\n                                                p.Grupo,\n                                                IFNULL(des.Porcentaje, '') AS DesPorcentaje,\n                                                IFNULL(des.APartirDe, '') AS DesApartirDe\n                                            FROM\n                                                BD_Pos.productos AS pPos\n                                            LEFT JOIN\n                                                programaembd.productos AS p ON pPos.Cod = p.Cod\n                                            LEFT JOIN\n                                                programaembd.CoordinatesPages AS CoorPages ON pPos.Consecutivo = CoorPages.Consecutive\n                                            LEFT JOIN\n                                                programaembd.proovedores AS prov ON p.CodProovedor = prov.Cod\n                                            LEFT JOIN \n                                                programaembd.subcategorias AS SubCat ON p.SubCategoria = SubCat.IDSubCategoria\n                                            LEFT JOIN\n                                                programaembd.categoria AS Cat ON SubCat.IDCategoria = Cat.IDCategoria\n                                            LEFT JOIN\n                                                BD_Pos.clases AS clases ON clases.Id = pPos.Clase\n                                            LEFT JOIN\n\t\t\t\t\t\t                        programaembd.descuentos AS des ON des.Cod = p.Cod");
        case 6:
          _yield$connection$que39 = _context16.sent;
          _yield$connection$que40 = _slicedToArray(_yield$connection$que39, 1);
          rows = _yield$connection$que40[0];
          res.json(rows);
          connection.end();
          _context16.next = 16;
          break;
        case 13:
          _context16.prev = 13;
          _context16.t0 = _context16["catch"](0);
          console.log('Error-getProductList: ', _context16.t0);
        case 16:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 13]]);
  }));
  return function getProductList(_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}();
var getClasesList = exports.getClasesList = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res) {
    var connection, _yield$connection$que41, _yield$connection$que42, rows;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          _context17.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context17.sent;
          _context17.next = 6;
          return connection.query("SELECT\n                                                    cla.Id,\n                                                    cla.Nombre\n                                                FROM\n                                                    BD_Pos.clases AS cla");
        case 6:
          _yield$connection$que41 = _context17.sent;
          _yield$connection$que42 = _slicedToArray(_yield$connection$que41, 1);
          rows = _yield$connection$que42[0];
          res.json(rows);
          connection.end();
          _context17.next = 16;
          break;
        case 13:
          _context17.prev = 13;
          _context17.t0 = _context17["catch"](0);
          console.log('Error-getProductList: ', _context17.t0);
        case 16:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[0, 13]]);
  }));
  return function getClasesList(_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}();
var postUpdateProduct = exports.postUpdateProduct = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18(req, res) {
    var connection, updateProductSql, productValues, updateProductSql1, productValues1, updateCoordinatesPages, coordinatesValues, updateDiscounts, discountsValues, _yield$connection$que43, _yield$connection$que44, _rows, _yield$connection$que45, _yield$connection$que46, rows, NCantidad, _yield$connection$que47, _yield$connection$que48, restar, _yield$connection$que49, _yield$connection$que50, sumar, deteleotherSuppliers, deteleotherSuppliersValues, NewOtherSuppliers, NewOtherSuppliersValues;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          _context18.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context18.sent;
          _context18.prev = 3;
          console.log(req.body);
          _context18.next = 7;
          return connection.beginTransaction();
        case 7:
          // Actualizar el producto en la base de datos principal
          updateProductSql = "\n        UPDATE\n            productos\n        SET\n            Descripcion = ?, \n            EsUnidadOpaquete = ?, \n            Agotado = ?,\n            SubCategoria = ?,\n            CodProovedor = ?,\n            PCosto =  ?,\n            PVenta =  ?,\n            PVenta1 = ?,\n            PVenta2 = ?,\n            Ubicaci\xF3n = ?,\n            Iva = ?,\n            Minimo = ?,\n            Maximo = ?,\n            Nota = ?,\n            Detalle = ?,\n            ImgName = ?,\n            Grupo = ?\n        WHERE\n            Cod = ?";
          productValues = [req.body.Descripcion, req.body.EsunidadOpaquete, req.body.Agotado, req.body.IdSubCategoria, req.body.CodProveedor, req.body.PCosto, req.body.PventaContado, req.body.PVentaCredito, req.body.PVentaDistribuidor, req.body.Ubicacion, req.body.Iva, req.body.Minimo, req.body.Maximo, req.body.Nota, req.body.Detalle, req.body.ImgNombre, req.body.Grupo, req.body.Cod];
          _context18.next = 11;
          return connection.execute(updateProductSql, productValues);
        case 11:
          //! Actualizar el producto  en la base de datos POS
          //Primero obtengo el consecutivo del pro
          updateProductSql1 = "UPDATE\n                                        BD_Pos.productos\n                                    SET\n                                        Descripcion = ?,\n                                        Clase = ?,\n                                        SubCategoria = ?,\n                                        Detalle = ?,\n                                        Iva = ?,\n                                        SVenta = ?,\n                                        Clase = ?\n                                    WHERE\n                                        Consecutivo = ?";
          productValues1 = [req.body.Descripcion, req.body.Clase, req.body.SubCategoria, req.body.Detalle, req.body.Iva, req.body.SVenta, req.body.IdClase, req.body.Consecutivo];
          _context18.next = 15;
          return connection.execute(updateProductSql1, productValues1);
        case 15:
          if (!(req.body.Pagina !== '' && req.body.CoordenadaX !== '' && req.body.CoordenadaY !== '')) {
            _context18.next = 20;
            break;
          }
          updateCoordinatesPages = "INSERT INTO CoordinatesPages (\n                                                                        Consecutive,\n                                                                        Cod,\n                                                                        Pag,\n                                                                        xPosition,\n                                                                        yPosition)\n                                                        VALUES (?,?,?,?,?)\n                                                        ON DUPLICATE KEY UPDATE\n                                                            Pag = ?,\n                                                            xPosition = ?,\n                                                            yPosition = ?";
          coordinatesValues = [req.body.Consecutivo, req.body.Cod, req.body.Pagina, req.body.CoordenadaX, req.body.CoordenadaY, req.body.Pagina,
          // para UPDATE
          req.body.CoordenadaX, req.body.CoordenadaY];
          _context18.next = 20;
          return connection.execute(updateCoordinatesPages, coordinatesValues);
        case 20:
          if (!(req.body.Pdiscount !== 0 && req.body.Pdiscount !== '')) {
            _context18.next = 27;
            break;
          }
          updateDiscounts = "INSERT INTO descuentos (\n                                                                Cod,\n                                                                Porcentaje,\n                                                                APartirDe\n                                                            )\n                                                            VALUES (?, ?, ?)\n                                                            ON DUPLICATE KEY UPDATE\n                                                                Porcentaje = VALUES(Porcentaje),\n                                                                APartirDe = VALUES(APartirDe)";
          discountsValues = [req.body.Cod, req.body.Pdiscount, req.body.Ndiscount];
          _context18.next = 25;
          return connection.execute(updateDiscounts, discountsValues);
        case 25:
          _context18.next = 32;
          break;
        case 27:
          _context18.next = 29;
          return connection.query("DELETE FROM descuentos WHERE Cod = ?", [req.body.Cod]);
        case 29:
          _yield$connection$que43 = _context18.sent;
          _yield$connection$que44 = _slicedToArray(_yield$connection$que43, 1);
          _rows = _yield$connection$que44[0];
        case 32:
          _context18.next = 34;
          return connection.query("SELECT\n                                                    COALESCE(SUM(\n                                                        CASE \n                                                            WHEN tipo = 'entrada' THEN Cantidad\n                                                            WHEN tipo = 'salida' THEN -Cantidad\n                                                            ELSE 0\n                                                        END\n                                                    ), 0) AS Cantidad\n                                                FROM (\n                                                    SELECT 'entrada' AS tipo, Cantidad FROM entradas WHERE Codigo = ?\n                                                    UNION ALL\n                                                    SELECT 'salida' AS tipo, Cantidad FROM salidas WHERE Codigo = ?\n                                                ) AS movimientos", [req.body.Cod, req.body.Cod]);
        case 34:
          _yield$connection$que45 = _context18.sent;
          _yield$connection$que46 = _slicedToArray(_yield$connection$que45, 1);
          rows = _yield$connection$que46[0];
          NCantidad = Math.abs(rows[0].Cantidad - req.body.Cantidad);
          console.log(req.body.Fecha);
          if (!(Number(rows[0].Cantidad) > Number(req.body.Cantidad))) {
            _context18.next = 47;
            break;
          }
          _context18.next = 42;
          return connection.query("INSERT INTO salidas (NDePedido,\n                                                                          Cantidad,\n                                                                          Codigo,\n                                                                          Descipci\xF3n,\n                                                                          VrUnitario,\n                                                                          Costo,\n                                                                          IDSubCategoria,\n                                                                          SubCategoria,\n                                                                          CodProveedor,\n                                                                          Proveedor,\n                                                                          CodCliente,\n                                                                          Cliente,\n                                                                          CodColaborador,\n                                                                          Colaborador,\n                                                                          FechaDeIngreso,\n                                                                          TieneIVA,\n                                                                          CodResponsable,\n                                                                          Responsable,\n                                                                          Porcentaje,\n                                                                          APartirDe)\n                                                                    VALUES (?,\n                                                                            ?,\n                                                                            ?,\n                                                                            ?,\n                                                                            ?,\n                                                                            ?,\n                                                                            ?,\n                                                                            ?,\n                                                                            ?,\n                                                                            ?,\n                                                                            ?,\n                                                                            ?,\n                                                                            ?,\n                                                                            ?,\n                                                                            ?,\n                                                                            ?,\n                                                                            ?,\n                                                                            ?,\n                                                                            ?,\n                                                                            ?)", [0, NCantidad, req.body.Cod, req.body.Descripcion, 0, req.body.PCosto, req.body.IdSubCategoria, req.body.SubCategoria, 2, 'Arreglo de inventario', 0, 0, req.body.CodResponsable, req.body.Responsable, req.body.Fecha, req.body.Iva, req.body.CodResponsable, req.body.Responsable, '0', '0']);
        case 42:
          _yield$connection$que47 = _context18.sent;
          _yield$connection$que48 = _slicedToArray(_yield$connection$que47, 1);
          restar = _yield$connection$que48[0];
          _context18.next = 53;
          break;
        case 47:
          if (!(Number(rows[0].Cantidad) < Number(req.body.Cantidad))) {
            _context18.next = 53;
            break;
          }
          _context18.next = 50;
          return connection.query("INSERT INTO entradas (Consecutivo,\n                                                                        CodProveedor,\n                                                                        Proveedor,\n                                                                        Cantidad,\n                                                                        Codigo,\n                                                                        Descripci\xF3n,\n                                                                        Costo,\n                                                                        CostoLP,\n                                                                        Fecha,\n                                                                        Iva,\n                                                                        CodResponsable,\n                                                                        Responsable)\n                                                            VALUES (?,\n                                                                    ?,\n                                                                    ?,\n                                                                    ?,\n                                                                    ?,\n                                                                    ?,\n                                                                    ?,\n                                                                    ?,\n                                                                    ?,\n                                                                    ?,\n                                                                    ?,\n                                                                    ?)", [0, 2, 'Arreglo de inventario', NCantidad, req.body.Cod, req.body.Descripcion, 0, req.body.PCosto, req.body.Fecha, req.body.Iva, req.body.CodResponsable, req.body.Responsable]);
        case 50:
          _yield$connection$que49 = _context18.sent;
          _yield$connection$que50 = _slicedToArray(_yield$connection$que49, 1);
          sumar = _yield$connection$que50[0];
        case 53:
          //!Modifica otros proveedores
          //Crea la lista de otros proveedores
          //primero elimina los datos previos
          deteleotherSuppliers = "DELETE FROM\n                                        otrosproveedores\n                                    WHERE\n                                        Cod = ?";
          deteleotherSuppliersValues = [req.body.Cod];
          _context18.next = 57;
          return connection.execute(deteleotherSuppliers, deteleotherSuppliersValues);
        case 57:
          if (!(req.body.otrosProveedores.length > 0)) {
            _context18.next = 62;
            break;
          }
          NewOtherSuppliers = "\n                INSERT INTO otrosproveedores (Cod, CodP, PCosto, Cantidad)\n                VALUES ".concat(req.body.otrosProveedores.map(function () {
            return '(?, ?, ?, ?)';
          }).join(', '), "\n            ");
          NewOtherSuppliersValues = req.body.otrosProveedores.flatMap(function (supplier) {
            return [req.body.Cod,
            // mismo Cod para todas las filas
            supplier.CodP, supplier.PCosto, supplier.Cantidad];
          });
          _context18.next = 62;
          return connection.execute(NewOtherSuppliers, NewOtherSuppliersValues);
        case 62:
          _context18.next = 64;
          return connection.commit();
        case 64:
          res.status(200).json({
            sucess: true,
            error: ''
          });
          _context18.next = 73;
          break;
        case 67:
          _context18.prev = 67;
          _context18.t0 = _context18["catch"](3);
          console.log(_context18.t0);
          _context18.next = 72;
          return connection.rollback();
        case 72:
          res.status(500).json({
            sucess: false,
            error: String(_context18.t0)
          });
        case 73:
          _context18.prev = 73;
          _context18.next = 76;
          return connection.end();
        case 76:
          return _context18.finish(73);
        case 77:
        case "end":
          return _context18.stop();
      }
    }, _callee18, null, [[3, 67, 73, 77]]);
  }));
  return function postUpdateProduct(_x35, _x36) {
    return _ref18.apply(this, arguments);
  };
}();
var postOtherSupplier = exports.postOtherSupplier = /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee19(req, res) {
    var connection, _yield$connection$que51, _yield$connection$que52, rows;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          _context19.prev = 0;
          _context19.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context19.sent;
          _context19.next = 6;
          return connection.query("SELECT \n                                                    oP.Cod,\n                                                    oP.CodP,\n                                                    p.Proovedor AS Proveedor,\n                                                    oP.PCosto,\n                                                    oP.Cantidad\n                                                FROM\n                                                    otrosproveedores AS oP\n                                                LEFT JOIN\n                                                    proovedores AS p ON p.Cod = oP.CodP\n                                                WHERE\n                                                    oP.Cod = ?", [req.body.Cod]);
        case 6:
          _yield$connection$que51 = _context19.sent;
          _yield$connection$que52 = _slicedToArray(_yield$connection$que51, 1);
          rows = _yield$connection$que52[0];
          res.json(rows);
          connection.end();
          _context19.next = 16;
          break;
        case 13:
          _context19.prev = 13;
          _context19.t0 = _context19["catch"](0);
          console.log('Error-postOtherSupplier: ', _context19.t0);
        case 16:
        case "end":
          return _context19.stop();
      }
    }, _callee19, null, [[0, 13]]);
  }));
  return function postOtherSupplier(_x37, _x38) {
    return _ref19.apply(this, arguments);
  };
}();
var quiantityAndDisponible = exports.quiantityAndDisponible = /*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee20(req, res) {
    var connection, _yield$connection$que53, _yield$connection$que54, rows;
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          _context20.prev = 0;
          _context20.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context20.sent;
          _context20.next = 6;
          return connection.query("SELECT\n                                                    SUM(CASE \n                                                        WHEN tipo = 'entrada' THEN Cantidad\n                                                        WHEN tipo = 'salida' THEN -Cantidad\n                                                        ELSE 0 END\n                                                    ) AS Cantidad,\n                                                    SUM(CASE \n                                                        WHEN tipo = 'entrada' THEN Cantidad\n                                                        WHEN tipo = 'salida' THEN -Cantidad\n                                                        WHEN tipo = 'reservado' THEN -Cantidad\n                                                        ELSE 0 END\n                                                    ) AS Disponible\n                                                FROM (\n                                                    SELECT 'entrada' AS tipo, Cantidad FROM entradas WHERE Codigo = ?\n                                                    UNION ALL\n                                                    SELECT 'salida' AS tipo, Cantidad FROM salidas WHERE Codigo = ?\n                                                    UNION ALL\n                                                    SELECT 'reservado' AS tipo, f.Cantidad\n                                                    FROM flujodeestados f\n                                                    WHERE f.Codigo = ?\n                                                    AND f.Incompleto = '0'\n                                                    AND f.NDePedido IN (\n                                                        SELECT NDePedido\n                                                        FROM tabladeestados\n                                                        WHERE Estado <> 'Anulado'\n                                                    )\n                                                ) AS movimientos", [req.body.Cod, req.body.Cod, req.body.Cod]);
        case 6:
          _yield$connection$que53 = _context20.sent;
          _yield$connection$que54 = _slicedToArray(_yield$connection$que53, 1);
          rows = _yield$connection$que54[0];
          res.json(rows);
          connection.end();
          _context20.next = 16;
          break;
        case 13:
          _context20.prev = 13;
          _context20.t0 = _context20["catch"](0);
          console.log('Error-quiantityAndDisponible: ', _context20.t0);
        case 16:
        case "end":
          return _context20.stop();
      }
    }, _callee20, null, [[0, 13]]);
  }));
  return function quiantityAndDisponible(_x39, _x40) {
    return _ref20.apply(this, arguments);
  };
}();
var postNewProduct = exports.postNewProduct = /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee21(req, res) {
    var connection, NewProductSqlPos, productValuesPos, _yield$connection$que55, _yield$connection$que56, rows, Consecutive, NewProductSql, productValues, NewCoordinatesSql, CoordinatesValues, updateDiscounts, discountsValues, NewOtherSuppliers, NewOtherSuppliersValues, NewEntradasSql, EntradasValues, NewSalidasSql, SalidasValues;
    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          _context21.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context21.sent;
          _context21.prev = 3;
          console.log(req.body);
          _context21.next = 7;
          return connection.beginTransaction();
        case 7:
          //! Nuevo producto en la base de datos POS
          NewProductSqlPos = "\n        INSERT INTO\n            BD_Pos.productos\n            (IdFerreteria,\n            Cod,\n            Descripcion,\n            Clase,\n            SubCategoria,\n            Detalle,\n            Iva,\n            SVenta,\n            ImgName)\n        VALUES\n        (\n            ?,\n            ?,\n            ?,\n            ?,\n            ?,\n            ?,\n            ?,\n            ?,\n            ?\n        )";
          productValuesPos = [0, req.body.Cod, req.body.Descripcion, req.body.IdClase, req.body.IdSubCategoria, req.body.Detalle, req.body.Iva, req.body.SVenta, req.body.ImgNombre];
          _context21.next = 11;
          return connection.execute(NewProductSqlPos, productValuesPos);
        case 11:
          _context21.next = 13;
          return connection.query("SELECT\n                                                    MAX(Consecutivo) AS Consecutivo\n                                                FROM\n                                                    BD_Pos.productos");
        case 13:
          _yield$connection$que55 = _context21.sent;
          _yield$connection$que56 = _slicedToArray(_yield$connection$que55, 1);
          rows = _yield$connection$que56[0];
          Consecutive = [rows][0].Consecutivo; //! Nuevo producto en la base de datos principal
          NewProductSql = "\n        INSERT INTO\n            programaembd.productos\n        VALUES\n        (\n            ?,\n            ?,\n            ?,\n            ?,\n            ?,\n            ?,\n            ?,\n            ?,\n            ?,\n            ?,\n            ?,\n            ?,\n            ?,\n            ?,\n            ?,\n            ?,\n            ?,\n            ?\n        )";
          productValues = [req.body.Cod, req.body.Descripcion, req.body.EsunidadOpaquete, req.body.Agotado, req.body.IdSubCategoria, req.body.CodProveedor, req.body.PCosto, req.body.PventaContado, req.body.PVentaCredito, req.body.PVentaDistribuidor, req.body.Ubicacion, req.body.Iva, req.body.Minimo, req.body.Maximo, req.body.Nota, req.body.Detalle, req.body.ImgNombre, req.body.Grupo];
          _context21.next = 21;
          return connection.execute(NewProductSql, productValues);
        case 21:
          if (!(req.body.Pagina !== '' || req.body.CoordenadaX !== '' || req.body.CoordenadaY !== '')) {
            _context21.next = 26;
            break;
          }
          NewCoordinatesSql = "\n            INSERT INTO\n                CoordinatesPages\n            VALUES\n            (\n                ?,\n                ?,\n                ?,\n                ?,\n                ?\n            )";
          CoordinatesValues = [Consecutive, req.body.Cod, req.body.Pagina, req.body.CoordenadaX, req.body.CoordenadaY];
          _context21.next = 26;
          return connection.execute(NewCoordinatesSql, CoordinatesValues);
        case 26:
          if (!(req.body.Pdiscount !== 0 && req.body.Pdiscount !== '')) {
            _context21.next = 32;
            break;
          }
          console.log('Entro en descuentos');
          updateDiscounts = "INSERT INTO descuentos (\n                                                            Cod,\n                                                            Porcentaje,\n                                                            APartirDe\n                                                            ) VALUES (?,?,?)";
          discountsValues = [req.body.Cod, req.body.Pdiscount, req.body.Ndiscount];
          _context21.next = 32;
          return connection.execute(updateDiscounts, discountsValues);
        case 32:
          if (!(req.body.otrosProveedores.length > 0)) {
            _context21.next = 37;
            break;
          }
          NewOtherSuppliers = "\n                INSERT INTO otrosproveedores (Cod, CodP, PCosto, Cantidad)\n                VALUES ".concat(req.body.otrosProveedores.map(function () {
            return '(?, ?, ?, ?)';
          }).join(', '), "\n            ");
          NewOtherSuppliersValues = req.body.otrosProveedores.flatMap(function (supplier) {
            return [req.body.Cod,
            // mismo Cod para todas las filas
            supplier.CodP, supplier.PCosto, supplier.Cantidad];
          });
          _context21.next = 37;
          return connection.execute(NewOtherSuppliers, NewOtherSuppliersValues);
        case 37:
          if (!(req.body.Cantidad !== '' || req.body.Cantidad !== 0)) {
            _context21.next = 49;
            break;
          }
          if (!(req.body.Cantidad > 0)) {
            _context21.next = 45;
            break;
          }
          NewEntradasSql = "\n                INSERT INTO\n                    entradas\n                VALUES\n                (\n                    ?,\n                    ?,\n                    ?,\n                    ?,\n                    ?,\n                    ?,\n                    ?,\n                    ?,\n                    ?,\n                    ?,\n                    ?,\n                    ?\n                )";
          EntradasValues = ['000', '2', 'Arreglo de inventario', req.body.Cantidad, req.body.Cod, req.body.Descripcion, '0', req.body.PCosto, req.body.Fecha, req.body.Iva, req.body.CodResponsable, req.body.Responsable];
          _context21.next = 43;
          return connection.execute(NewEntradasSql, EntradasValues);
        case 43:
          _context21.next = 49;
          break;
        case 45:
          NewSalidasSql = "\n                INSERT INTO\n                    salidas\n                VALUES\n                (\n                    ?,\n                    ?,\n                    ?,\n                    ?,\n                    ?,\n                    ?,\n                    ?,\n                    ?,\n                    ?,\n                    ?,\n                    ?,\n                    ?,\n                    ?,\n                    ?\n                )";
          SalidasValues = ['000', '2', 'Arreglo de inventario', req.body.Cantidad, req.body.Cod, req.body.Descripcion, '0', req.body.PCosto, req.body.Fecha, req.body.Iva, req.body.CodResponsable, req.body.Responsable, '0', '0'];
          _context21.next = 49;
          return connection.execute(NewSalidasSql, SalidasValues);
        case 49:
          _context21.next = 51;
          return connection.commit();
        case 51:
          res.status(200).json({
            sucess: true,
            error: ''
          });
          _context21.next = 60;
          break;
        case 54:
          _context21.prev = 54;
          _context21.t0 = _context21["catch"](3);
          console.log(_context21.t0);
          _context21.next = 59;
          return connection.rollback();
        case 59:
          res.status(500).json({
            sucess: false,
            error: String(_context21.t0)
          });
        case 60:
          _context21.prev = 60;
          _context21.next = 63;
          return connection.end();
        case 63:
          return _context21.finish(60);
        case 64:
        case "end":
          return _context21.stop();
      }
    }, _callee21, null, [[3, 54, 60, 64]]);
  }));
  return function postNewProduct(_x41, _x42) {
    return _ref21.apply(this, arguments);
  };
}();
var quiantityProductList = exports.quiantityProductList = /*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee22(req, res) {
    var connection, _yield$connection$que57, _yield$connection$que58, rows;
    return _regeneratorRuntime().wrap(function _callee22$(_context22) {
      while (1) switch (_context22.prev = _context22.next) {
        case 0:
          _context22.prev = 0;
          _context22.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context22.sent;
          _context22.next = 6;
          return connection.query("SELECT\n                                                pPos.Consecutivo,\n                                                pPos.Cod,\n                                                pPos.Descripcion,\n                                                p.EsUnidadOpaquete,\n                                                Cat.Categoria,\n                                                SubCat.IDCategoria,\n                                                SubCat.SubCategoria,\n                                                p.SubCategoria AS IdSubCategoria,\n                                                p.CodProovedor,\n                                                prov.Proovedor AS proveedor,\n                                                p.PCosto,\n                                                p.PVenta AS PventaContado,\n                                                p.Pventa1 AS PVentaCredito,\n                                                p.Pventa2 AS PVentaDistribuidor,\n                                                p.Ubicaci\xF3n,\n                                                p.Minimo,\n                                                p.Maximo,\n                                                p.Iva,\n                                                p.Agotado,\n                                                pPos.SVenta,\n                                                pPos.Clase AS IdClase,\n                                                clases.Nombre AS Clase,\n                                                p.ImgName,\n                                                IFNULL(CoorPages.Pag, '') AS Pagina,\n                                                IFNULL(CoorPages.xPosition, '') AS CoordenadaX,\n                                                IFNULL(CoorPages.yPosition, '') AS CoordenadaY,\n                                                p.Nota,\n                                                p.Detalle,\n                                                p.Grupo,\n                                                IFNULL(des.Porcentaje, '') AS DesPorcentaje,\n                                                IFNULL(des.APartirDe, '') AS DesApartirDe,\n                                                IFNULL(e.TotalEntrada, 0) - IFNULL(s.TotalSalida, 0) AS Cantidad\n                                            FROM\n                                                BD_Pos.productos AS pPos\n                                            LEFT JOIN\n                                                programaembd.productos AS p ON pPos.Cod = p.Cod\n                                            LEFT JOIN\n                                                programaembd.CoordinatesPages AS CoorPages ON pPos.Consecutivo = CoorPages.Consecutive\n                                            LEFT JOIN\n                                                programaembd.proovedores AS prov ON p.CodProovedor = prov.Cod\n                                            LEFT JOIN \n                                                programaembd.subcategorias AS SubCat ON p.SubCategoria = SubCat.IDSubCategoria\n                                            LEFT JOIN\n                                                programaembd.categoria AS Cat ON SubCat.IDCategoria = Cat.IDCategoria\n                                            LEFT JOIN\n                                                BD_Pos.clases AS clases ON clases.Id = pPos.Clase\n                                            LEFT JOIN\n                                            programaembd.descuentos AS des ON des.Cod = p.Cod\n                                            -- Subconsulta para entradas\n                                                                LEFT JOIN (\n                                                                    SELECT\n                                                Codigo,\n                                                SUM(Cantidad) AS TotalEntrada\n                                                                    FROM\n                                                programaembd.entradas\n                                                                    GROUP BY\n                                                Codigo\n                                                                ) AS e ON e.Codigo = p.Cod\n\n                                                                -- Subconsulta para salidas\n                                                                LEFT JOIN (\n                                                                    SELECT \n                                                Codigo,\n                                                SUM(Cantidad) AS TotalSalida\n                                                                    FROM\n                                                programaembd.salidas\n                                                                    GROUP BY Codigo\n                                                                ) AS s ON s.Codigo = p.Cod\n                                            WHERE\n                                            pPos.SVenta = '1'");
        case 6:
          _yield$connection$que57 = _context22.sent;
          _yield$connection$que58 = _slicedToArray(_yield$connection$que57, 1);
          rows = _yield$connection$que58[0];
          res.json(rows);
          connection.end();
          _context22.next = 16;
          break;
        case 13:
          _context22.prev = 13;
          _context22.t0 = _context22["catch"](0);
          console.log('Error-postOtherSupplier: ', _context22.t0);
        case 16:
        case "end":
          return _context22.stop();
      }
    }, _callee22, null, [[0, 13]]);
  }));
  return function quiantityProductList(_x43, _x44) {
    return _ref22.apply(this, arguments);
  };
}();
var CoordinatesPagesList = exports.CoordinatesPagesList = /*#__PURE__*/function () {
  var _ref23 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee23(req, res) {
    var connection, _yield$connection$que59, _yield$connection$que60, rows;
    return _regeneratorRuntime().wrap(function _callee23$(_context23) {
      while (1) switch (_context23.prev = _context23.next) {
        case 0:
          _context23.prev = 0;
          _context23.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context23.sent;
          _context23.next = 6;
          return connection.query("SELECT\n                                                    Consecutive,\n                                                    Cod,\n                                                    Pag,\n                                                    xPosition,\n                                                    yPosition\n                                                FROM\n                                                    CoordinatesPages");
        case 6:
          _yield$connection$que59 = _context23.sent;
          _yield$connection$que60 = _slicedToArray(_yield$connection$que59, 1);
          rows = _yield$connection$que60[0];
          res.json(rows);
          connection.end();
          _context23.next = 16;
          break;
        case 13:
          _context23.prev = 13;
          _context23.t0 = _context23["catch"](0);
          console.log('Error-CoordinatesPagesList: ', _context23.t0);
        case 16:
        case "end":
          return _context23.stop();
      }
    }, _callee23, null, [[0, 13]]);
  }));
  return function CoordinatesPagesList(_x45, _x46) {
    return _ref23.apply(this, arguments);
  };
}();

//!Supplier
var postNewSupplier = exports.postNewSupplier = /*#__PURE__*/function () {
  var _ref24 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee24(req, res) {
    var connection, _yield$connection$que61, _yield$connection$que62, NewClient;
    return _regeneratorRuntime().wrap(function _callee24$(_context24) {
      while (1) switch (_context24.prev = _context24.next) {
        case 0:
          _context24.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context24.sent;
          _context24.prev = 3;
          _context24.next = 6;
          return connection.query("INSERT INTO proovedores (\n                                                                    NIt,\n                                                                    Proovedor,\n                                                                    Contacto,\n                                                                    Telefono,\n                                                                    Cel,\n                                                                    Email,\n                                                                    Web,\n                                                                    Direccion,\n                                                                    Ruta,\n                                                                    Nota,\n                                                                    VerificacionNit,\n                                                                    Geolocalizacion\n                                                                    )\n                                                VALUES (\n                                                        ?,\n                                                        ?,\n                                                        ?,\n                                                        ?,\n                                                        ?,\n                                                        ?,\n                                                        ?,\n                                                        ?,\n                                                        ?,\n                                                        ?,\n                                                        ?,\n                                                        ?)", [req.body.NitCc, req.body.Proveedor, req.body.Contacto, req.body.Telefono, req.body.Cel, req.body.Email, req.body.Web, req.body.Direccion, req.body.Ruta, req.body.Nota, req.body.CV, req.body.Geolocalizacion]);
        case 6:
          _yield$connection$que61 = _context24.sent;
          _yield$connection$que62 = _slicedToArray(_yield$connection$que61, 1);
          NewClient = _yield$connection$que62[0];
          res.status(200).json({
            sucess: true,
            error: ''
          });
          _context24.next = 16;
          break;
        case 12:
          _context24.prev = 12;
          _context24.t0 = _context24["catch"](3);
          console.log('Error-postNewSupplier: ', _context24.t0);
          res.status(500).json({
            sucess: false,
            error: _context24.t0
          });
        case 16:
          _context24.prev = 16;
          connection.end();
          return _context24.finish(16);
        case 19:
        case "end":
          return _context24.stop();
      }
    }, _callee24, null, [[3, 12, 16, 19]]);
  }));
  return function postNewSupplier(_x47, _x48) {
    return _ref24.apply(this, arguments);
  };
}();
var postUpdateSupplier = exports.postUpdateSupplier = /*#__PURE__*/function () {
  var _ref25 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee25(req, res) {
    var connection, _yield$connection$que63, _yield$connection$que64, NewClient;
    return _regeneratorRuntime().wrap(function _callee25$(_context25) {
      while (1) switch (_context25.prev = _context25.next) {
        case 0:
          _context25.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context25.sent;
          _context25.prev = 3;
          _context25.next = 6;
          return connection.query("UPDATE\n                                                        proovedores\n                                                    SET\n                                                        NIt = ?,\n                                                        Proovedor = ?,\n                                                        Contacto = ?,\n                                                        Telefono = ?,\n                                                        Cel = ?,\n                                                        Email = ?,\n                                                        Web = ?,\n                                                        Direccion = ?,\n                                                        Ruta = ?,\n                                                        Nota = ?,\n                                                        VerificacionNit = ?,\n                                                        Geolocalizacion = ?\n                                                    WHERE\n                                                        Cod = ?", [req.body.NitCc, req.body.Proveedor, req.body.Contacto, req.body.Telefono, req.body.Cel, req.body.Email, req.body.Web, req.body.Direccion, req.body.Ruta, req.body.Nota, req.body.CV, req.body.Geolocalizacion, req.body.Cod]);
        case 6:
          _yield$connection$que63 = _context25.sent;
          _yield$connection$que64 = _slicedToArray(_yield$connection$que63, 1);
          NewClient = _yield$connection$que64[0];
          res.status(200).json({
            sucess: true,
            error: ''
          });
          _context25.next = 16;
          break;
        case 12:
          _context25.prev = 12;
          _context25.t0 = _context25["catch"](3);
          console.log('Error-postUpdateSupplier: ', _context25.t0);
          res.status(500).json({
            sucess: false,
            error: _context25.t0
          });
        case 16:
          _context25.prev = 16;
          connection.end();
          return _context25.finish(16);
        case 19:
        case "end":
          return _context25.stop();
      }
    }, _callee25, null, [[3, 12, 16, 19]]);
  }));
  return function postUpdateSupplier(_x49, _x50) {
    return _ref25.apply(this, arguments);
  };
}();
var getSupplierList = exports.getSupplierList = /*#__PURE__*/function () {
  var _ref26 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee26(req, res) {
    var connection, _yield$connection$que65, _yield$connection$que66, rows;
    return _regeneratorRuntime().wrap(function _callee26$(_context26) {
      while (1) switch (_context26.prev = _context26.next) {
        case 0:
          _context26.prev = 0;
          _context26.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context26.sent;
          _context26.next = 6;
          return connection.query("SELECT\n                                                    pro.Cod,\n                                                    pro.Nit,\n                                                    pro.VerificacionNit,\n                                                    pro.Proovedor,\n                                                    pro.Contacto,\n                                                    pro.Telefono,\n                                                    pro.Cel,\n                                                    pro.Email,\n                                                    pro.Web,\n                                                    pro.Direccion,\n                                                    pro.Ruta,\n                                                    pro.Geolocalizacion,\n                                                    pro.Nota\n                                                FROM\n                                                    proovedores AS pro\n                                                WHERE\n\t                                                pro.Cod <> 1 AND pro.Cod <> 2");
        case 6:
          _yield$connection$que65 = _context26.sent;
          _yield$connection$que66 = _slicedToArray(_yield$connection$que65, 1);
          rows = _yield$connection$que66[0];
          res.json(rows);
          connection.end();
          _context26.next = 16;
          break;
        case 13:
          _context26.prev = 13;
          _context26.t0 = _context26["catch"](0);
          console.log('Error-getSupplierList: ', _context26.t0);
        case 16:
        case "end":
          return _context26.stop();
      }
    }, _callee26, null, [[0, 13]]);
  }));
  return function getSupplierList(_x51, _x52) {
    return _ref26.apply(this, arguments);
  };
}();
//!Purchase

var postNewPurchase = exports.postNewPurchase = /*#__PURE__*/function () {
  var _ref27 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee27(req, res) {
    var connection, _yield$connection$que67, _yield$connection$que68, consecutivo, PurchasingHeader, PurchasingHeaderValue, EntranseList, EntranseListValues, NewNewPurchasePass, NewNewPurchasePassValues;
    return _regeneratorRuntime().wrap(function _callee27$(_context27) {
      while (1) switch (_context27.prev = _context27.next) {
        case 0:
          _context27.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context27.sent;
          _context27.prev = 3;
          _context27.next = 6;
          return connection.beginTransaction();
        case 6:
          _context27.next = 8;
          return connection.query("SELECT\n                                                            MAX(Consecutivo)+1 As Con\n                                                        FROM\n                                                            entradas");
        case 8:
          _yield$connection$que67 = _context27.sent;
          _yield$connection$que68 = _slicedToArray(_yield$connection$que67, 1);
          consecutivo = _yield$connection$que68[0];
          PurchasingHeader = "INSERT INTO\n                                    cabeceracompras\n                                    (\n                                        Consecutivo,    \n                                        NFactura,\n                                        CodProveedor,\n                                        Fecha,\n                                        FechaFactura,\n                                        FechaVencimiento,\n                                        Dias,\n                                        Iva,\n                                        RTF,\n                                        CodResponsable,\n                                        ContadoCredito\n                                    )\n                                VALUES (\n                                    ?,    \n                                    ?,\n                                    ?,\n                                    ?,\n                                    ?,\n                                    ?,\n                                    ?,\n                                    ?,\n                                    ?,\n                                    ?,\n                                    ?\n                                )";
          PurchasingHeaderValue = [consecutivo[0].Con, req.body.Nfactura, req.body.CodSupplier, req.body.Date, req.body.InvoiceDate, req.body.ExpirationDate, req.body.CreditDays, req.body.Iva ? 1 : 0, req.body.Retefuente, req.body.ResponsibleCode, req.body.ContadoOCredito];
          _context27.next = 15;
          return connection.execute(PurchasingHeader, PurchasingHeaderValue);
        case 15:
          if (!(req.body.PurchaseEntranseL.length > 0)) {
            _context27.next = 20;
            break;
          }
          EntranseList = "\n            INSERT INTO\n                    entradas (\n                                Consecutivo,\n                                CodProveedor,\n                                Proveedor,\n                                Cantidad,\n                                Codigo,\n                                Descripci\xF3n,\n                                Costo,\n                                CostoLP,\n                                Fecha,\n                                IVA,\n                                CodResponsable,\n                                Responsable\n                            )\n                VALUES ".concat(req.body.PurchaseEntranseL.map(function () {
            return '(?,?,?,?,?,?,?,?,?,?,?,?)';
          }).join(', '), "\n            ");
          EntranseListValues = req.body.PurchaseEntranseL.flatMap(function (product) {
            return [consecutivo[0].Con, req.body.CodSupplier, req.body.Supplier, product.Cantidad, product.Codigo, product.Descripcion, product.UIva, product.CostoLP, req.body.Date, product.TotalIva, req.body.ResponsibleCode, req.body.ContadoOCredito];
          });
          _context27.next = 20;
          return connection.execute(EntranseList, EntranseListValues);
        case 20:
          if (!(req.body.ContadoOCredito === 'Contado')) {
            _context27.next = 26;
            break;
          }
          NewNewPurchasePass = "INSERT INTO\n                                            abonoscompras\n                                            (\n                                                Consecutivo,\n                                                RC,\n                                                Fecha,\n                                                CodProveedor,\n                                                Abono\n                                            )\n                                        VALUES (\n                                            ?,\n                                            ?,\n                                            ?,\n                                            ?,\n                                            ?\n                                        )";
          NewNewPurchasePassValues = [consecutivo[0].Con, 0, req.body.Date, req.body.CodSupplier, req.body.Total];
          console.log('req.body.Total', req.body.Total);
          _context27.next = 26;
          return connection.execute(NewNewPurchasePass, NewNewPurchasePassValues);
        case 26:
          _context27.next = 28;
          return connection.commit();
        case 28:
          //GUARDA TODO SI NADA FALLÓ
          res.status(200).json({
            sucess: true,
            error: '',
            Consecutivo: consecutivo[0].Con
          });
          _context27.next = 37;
          break;
        case 31:
          _context27.prev = 31;
          _context27.t0 = _context27["catch"](3);
          _context27.next = 35;
          return connection.rollback();
        case 35:
          //DESHACE TODO LO QUE SE INSERTÓ
          console.log('Error-postNewPurchase: ', _context27.t0);
          res.status(500).json({
            sucess: false,
            error: _context27.t0
          });
        case 37:
          _context27.prev = 37;
          connection.end();
          return _context27.finish(37);
        case 40:
        case "end":
          return _context27.stop();
      }
    }, _callee27, null, [[3, 31, 37, 40]]);
  }));
  return function postNewPurchase(_x53, _x54) {
    return _ref27.apply(this, arguments);
  };
}();
var postUpdatePurchase = exports.postUpdatePurchase = /*#__PURE__*/function () {
  var _ref28 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee28(req, res) {
    var connection, PurchasingHeader, PurchasingHeaderValue, DeleteEntranse, DeleteEntranseValues, EntranseList, EntranseListValues;
    return _regeneratorRuntime().wrap(function _callee28$(_context28) {
      while (1) switch (_context28.prev = _context28.next) {
        case 0:
          _context28.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context28.sent;
          _context28.prev = 3;
          PurchasingHeader = "UPDATE\n                                    cabeceracompras SET\n                                        NFactura = ?,\n                                        CodProveedor = ?,\n                                        Fecha = ?,\n                                        FechaFactura = ?,\n                                        FechaVencimiento = ?,\n                                        Dias = ?,\n                                        Iva = ?,\n                                        RTF = ?,\n                                        CodResponsable = ?,\n                                        ContadoCredito = ?\n                                    WHERE\n                                        Consecutivo = ?";
          PurchasingHeaderValue = [req.body.Nfactura, req.body.CodSupplier, req.body.Date, req.body.InvoiceDate, req.body.ExpirationDate, req.body.CreditDays, req.body.Iva ? 1 : 0, req.body.Retefuente, req.body.ResponsibleCode, req.body.ContadoOCredito, req.body.Consecutive];
          _context28.next = 8;
          return connection.execute(PurchasingHeader, PurchasingHeaderValue);
        case 8:
          //Delete the data from entradas
          DeleteEntranse = "DELETE FROM entradas WHERE Consecutivo = ?";
          DeleteEntranseValues = [req.body.Consecutive];
          _context28.next = 12;
          return connection.execute(DeleteEntranse, DeleteEntranseValues);
        case 12:
          if (!(req.body.PurchaseEntranseL.length > 0)) {
            _context28.next = 17;
            break;
          }
          EntranseList = "INSERT INTO\n                    entradas (\n                                Consecutivo,\n                                CodProveedor,\n                                Proveedor,\n                                Cantidad,\n                                Codigo,\n                                Descripci\xF3n,\n                                Costo,\n                                CostoLP,\n                                Fecha,\n                                IVA,\n                                CodResponsable,\n                                Responsable\n                            )\n                VALUES ".concat(req.body.PurchaseEntranseL.map(function () {
            return '(?,?,?,?,?,?,?,?,?,?,?,?)';
          }).join(', '), "\n            ");
          EntranseListValues = req.body.PurchaseEntranseL.flatMap(function (product) {
            return [req.body.Consecutive, req.body.CodSupplier, req.body.Supplier, product.Cantidad, product.Codigo, product.Descripcion, product.UIva, product.CostoLP, req.body.Date, product.TotalIva, req.body.ResponsibleCode, req.body.ContadoOCredito];
          });
          _context28.next = 17;
          return connection.execute(EntranseList, EntranseListValues);
        case 17:
          res.status(200).json({
            sucess: true,
            error: ''
          });
          _context28.next = 24;
          break;
        case 20:
          _context28.prev = 20;
          _context28.t0 = _context28["catch"](3);
          console.log('Error-postNewPurchase: ', _context28.t0);
          res.status(500).json({
            sucess: false,
            error: _context28.t0.message
          });
        case 24:
          _context28.prev = 24;
          connection.end();
          return _context28.finish(24);
        case 27:
        case "end":
          return _context28.stop();
      }
    }, _callee28, null, [[3, 20, 24, 27]]);
  }));
  return function postUpdatePurchase(_x55, _x56) {
    return _ref28.apply(this, arguments);
  };
}();
var getEntrantsList = exports.getEntrantsList = /*#__PURE__*/function () {
  var _ref29 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee29(req, res) {
    var connection, _yield$connection$que69, _yield$connection$que70, rows;
    return _regeneratorRuntime().wrap(function _callee29$(_context29) {
      while (1) switch (_context29.prev = _context29.next) {
        case 0:
          _context29.prev = 0;
          _context29.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context29.sent;
          _context29.next = 6;
          return connection.query("SELECT E.Consecutivo,\n                                                    E.Cantidad,\n                                                    E.Codigo AS Cod,\n                                                    E.Descripci\xF3n AS Descripcion,\n                                                    E.costo AS VrUnitario,\n                                                    E.CodProveedor,\n                                                    E.Proveedor,\n                                                    E.Fecha,\n                                                    cc.FechaFactura,\n                                                    cc.NFactura\n                                                FROM\n                                                    entradas AS E\n                                                LEFT JOIN\n                                                    cabeceracompras AS cc ON cc.Consecutivo = E.Consecutivo\n                                                WHERE\n                                                    E.Proveedor <> 'Nuevo Producto al inventario' AND E.Proveedor <> 'Arreglo de inventario'\n                                                GROUP BY\n                                                    E.Consecutivo, E.Cantidad, E.Codigo, E.Descripci\xF3n, E.costo, E.CodProveedor, E.Proveedor, E.Fecha\n                                                ORDER BY\n                                                    E.Fecha DESC");
        case 6:
          _yield$connection$que69 = _context29.sent;
          _yield$connection$que70 = _slicedToArray(_yield$connection$que69, 1);
          rows = _yield$connection$que70[0];
          res.json(rows);
          connection.end();
          _context29.next = 16;
          break;
        case 13:
          _context29.prev = 13;
          _context29.t0 = _context29["catch"](0);
          console.log('Error-getEntrantsList: ', _context29.t0);
        case 16:
        case "end":
          return _context29.stop();
      }
    }, _callee29, null, [[0, 13]]);
  }));
  return function getEntrantsList(_x57, _x58) {
    return _ref29.apply(this, arguments);
  };
}();
var getPurchaseList = exports.getPurchaseList = /*#__PURE__*/function () {
  var _ref30 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee30(req, res) {
    var connection, _yield$connection$que71, _yield$connection$que72, rows;
    return _regeneratorRuntime().wrap(function _callee30$(_context30) {
      while (1) switch (_context30.prev = _context30.next) {
        case 0:
          _context30.prev = 0;
          _context30.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context30.sent;
          _context30.next = 6;
          return connection.query("SELECT\n                                                    cab.Consecutivo,\n                                                    cab.NFactura,\n                                                    cab.CodProveedor,\n                                                    prov.Proovedor,\n                                                    prov.Telefono,\n                                                    prov.Direccion,\n                                                    cab.Fecha,\n                                                    cab.FechaFactura,\n                                                    cab.FechaVencimiento,\n                                                    cab.Dias,\n                                                    cab.Iva,\n                                                    cab.RTF,\n                                                    cab.CodResponsable,\n                                                    cab.ContadoCredito,\n                                                    CONCAT(col.Nombre, ' ' ,col.Apellido) AS Responsable,\n                                                    SUM(ent.Cantidad * ent.Costo) AS Total\n                                                FROM \n                                                    cabeceracompras AS cab\n                                                JOIN \n                                                    proovedores AS prov ON cab.CodProveedor = prov.Cod\n                                                LEFT JOIN \n                                                    entradas AS ent ON cab.Consecutivo = ent.Consecutivo\n                                                LEFT JOIN\n                                                    colaboradores AS col ON col.Cod = cab.CodResponsable\n                                                GROUP BY \n                                                    cab.Consecutivo\n                                                ORDER BY\n                                                    cab.Consecutivo DESC");
        case 6:
          _yield$connection$que71 = _context30.sent;
          _yield$connection$que72 = _slicedToArray(_yield$connection$que71, 1);
          rows = _yield$connection$que72[0];
          res.json(rows);
          connection.end();
          _context30.next = 16;
          break;
        case 13:
          _context30.prev = 13;
          _context30.t0 = _context30["catch"](0);
          console.log('Error-getPurchaseList: ', _context30.t0);
        case 16:
        case "end":
          return _context30.stop();
      }
    }, _callee30, null, [[0, 13]]);
  }));
  return function getPurchaseList(_x59, _x60) {
    return _ref30.apply(this, arguments);
  };
}();
var getPartialPaymentPurchase = exports.getPartialPaymentPurchase = /*#__PURE__*/function () {
  var _ref31 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee31(req, res) {
    var connection, _yield$connection$que73, _yield$connection$que74, rows;
    return _regeneratorRuntime().wrap(function _callee31$(_context31) {
      while (1) switch (_context31.prev = _context31.next) {
        case 0:
          _context31.prev = 0;
          _context31.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context31.sent;
          _context31.next = 6;
          return connection.query("SELECT\n                                                    ac.Consecutivo,\n                                                    IFNULL(SUM(ac.abono), 0) AS Saldo\n                                                FROM\n                                                    abonoscompras AS ac\n                                                GROUP BY \n                                                    ac.Consecutivo");
        case 6:
          _yield$connection$que73 = _context31.sent;
          _yield$connection$que74 = _slicedToArray(_yield$connection$que73, 1);
          rows = _yield$connection$que74[0];
          res.json(rows);
          connection.end();
          _context31.next = 16;
          break;
        case 13:
          _context31.prev = 13;
          _context31.t0 = _context31["catch"](0);
          console.log('Error-getPartialPaymentPurchase: ', _context31.t0);
        case 16:
        case "end":
          return _context31.stop();
      }
    }, _callee31, null, [[0, 13]]);
  }));
  return function getPartialPaymentPurchase(_x61, _x62) {
    return _ref31.apply(this, arguments);
  };
}();
var getPPPurchase = exports.getPPPurchase = /*#__PURE__*/function () {
  var _ref32 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee32(req, res) {
    var connection, PurchasePP, _yield$connection$que75, _yield$connection$que76, rows;
    return _regeneratorRuntime().wrap(function _callee32$(_context32) {
      while (1) switch (_context32.prev = _context32.next) {
        case 0:
          _context32.prev = 0;
          _context32.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context32.sent;
          PurchasePP = "SELECT\n                                ac.Consecutivo,\n                                ac.RC,\n                                ac.Fecha,\n                                ac.Abono\n                            FROM\n                                abonoscompras AS ac\n                            WHERE\n                                ac.Consecutivo = ?";
          if (req.body.type === 'Ventas') {
            PurchasePP = "SELECT\n                            av.Consecutivo,\n                            av.RC,\n                            av.Fecha,\n                            av.Abono\n                        FROM\n                            abonosventas AS av\n                        WHERE\n                            av.Consecutivo = ?";
          }
          _context32.next = 8;
          return connection.query(PurchasePP, [req.body.Consecutivo]);
        case 8:
          _yield$connection$que75 = _context32.sent;
          _yield$connection$que76 = _slicedToArray(_yield$connection$que75, 1);
          rows = _yield$connection$que76[0];
          res.json(rows);
          connection.end();
          _context32.next = 18;
          break;
        case 15:
          _context32.prev = 15;
          _context32.t0 = _context32["catch"](0);
          console.log('Error-getPPPurchase: ', _context32.t0);
        case 18:
        case "end":
          return _context32.stop();
      }
    }, _callee32, null, [[0, 15]]);
  }));
  return function getPPPurchase(_x63, _x64) {
    return _ref32.apply(this, arguments);
  };
}();
var postMakePP = exports.postMakePP = /*#__PURE__*/function () {
  var _ref33 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee33(req, res) {
    var connection, MakePP, Values;
    return _regeneratorRuntime().wrap(function _callee33$(_context33) {
      while (1) switch (_context33.prev = _context33.next) {
        case 0:
          _context33.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context33.sent;
          _context33.prev = 3;
          MakePP = "INSERT INTO\n                            abonoscompras\n                            (\n                            Consecutivo,\n                            RC,\n                            Fecha,\n                            CodProveedor,\n                            Abono\n                            )\n                        VALUES\n                            (?,?,?,?,?)";
          Values = [req.body.Consecutivo, req.body.RC, req.body.Fecha, req.body.CodProveedor, req.body.Abono];
          if (req.body.type === 'Ventas') {
            MakePP = "INSERT INTO\n                                    abonosventas\n                                    (\n                                    Consecutivo,\n                                    RC,\n                                    Fecha,\n                                    Abono\n                                    )\n                                VALUES\n                                    (?,?,?,?)";
            Values = [req.body.NDePedido, req.body.RC, req.body.Fecha, req.body.Abono];
          }
          _context33.next = 9;
          return connection.execute(MakePP, Values);
        case 9:
          res.status(200).json({
            sucess: true,
            error: ''
          });
          _context33.next = 16;
          break;
        case 12:
          _context33.prev = 12;
          _context33.t0 = _context33["catch"](3);
          console.log('Error-postMakePP: ', _context33.t0);
          res.status(500).json({
            sucess: false,
            error: _context33.t0
          });
        case 16:
          _context33.prev = 16;
          connection.end();
          return _context33.finish(16);
        case 19:
        case "end":
          return _context33.stop();
      }
    }, _callee33, null, [[3, 12, 16, 19]]);
  }));
  return function postMakePP(_x65, _x66) {
    return _ref33.apply(this, arguments);
  };
}();
var postDeletePP = exports.postDeletePP = /*#__PURE__*/function () {
  var _ref34 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee34(req, res) {
    var connection, deletePP, Values;
    return _regeneratorRuntime().wrap(function _callee34$(_context34) {
      while (1) switch (_context34.prev = _context34.next) {
        case 0:
          _context34.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context34.sent;
          _context34.prev = 3;
          deletePP = "DELETE FROM\n                            abonoscompras\n                        WHERE\n                            RC = ? and Consecutivo = ?";
          Values = [req.body.RC, req.body.Consecutivo];
          if (req.body.type === 'Ventas') {
            deletePP = "DELETE FROM\n                            abonosventas\n                        WHERE\n                            RC = ? and Consecutivo = ?";
            Values = [req.body.RC, req.body.Consecutivo];
          }
          _context34.next = 9;
          return connection.execute(deletePP, Values);
        case 9:
          res.status(200).json({
            sucess: true,
            error: ''
          });
          _context34.next = 16;
          break;
        case 12:
          _context34.prev = 12;
          _context34.t0 = _context34["catch"](3);
          console.log('Error-postMakePP: ', _context34.t0);
          res.status(500).json({
            sucess: false,
            error: _context34.t0
          });
        case 16:
          _context34.prev = 16;
          connection.end();
          return _context34.finish(16);
        case 19:
        case "end":
          return _context34.stop();
      }
    }, _callee34, null, [[3, 12, 16, 19]]);
  }));
  return function postDeletePP(_x67, _x68) {
    return _ref34.apply(this, arguments);
  };
}();

//!Entered
var getEnteredList = exports.getEnteredList = /*#__PURE__*/function () {
  var _ref35 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee35(req, res) {
    var connection, _yield$connection$que77, _yield$connection$que78, rows;
    return _regeneratorRuntime().wrap(function _callee35$(_context35) {
      while (1) switch (_context35.prev = _context35.next) {
        case 0:
          _context35.prev = 0;
          _context35.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context35.sent;
          _context35.next = 6;
          return connection.query("SELECT\n                                                    te.NDePedido,\n                                                    (cli.Ferreteria) AS Cliente,\n                                                    te.FechaFactura AS FechaOdePedido,\n                                                    te.FechaDeEntrega,\n                                                    ROUND(SUM(\n                                                    CASE\n                                                    WHEN\n                                                        ti.Cantidad > ti.APartirDe \n                                                    THEN\n                                                        ti.Cantidad*ti.VrUnitario * (1- IFNULL(cu.Porcentaje,0)/100) * (1 - (ti.Porcentaje/100))\n                                                    ELSE\n                                                        ti.Cantidad*ti.VrUnitario * (1- IFNULL(cu.Porcentaje,0)/100)\n                                                    END),2) AS Total\n                                                FROM\n                                                    tabladeestados AS te\n                                                LEFT JOIN\n                                                    tabladeingresados AS ti ON ti.NDePedido = te.NDePedido\n                                                LEFT JOIN\n                                                    clientes AS cli ON cli.Cod = te.CodCliente\n                                                LEFT JOIN\n                                                    CRedimidos AS cr ON cr.NPedido = te.NDePedido\n                                                LEFT JOIN\n                                                    Cupones AS cu ON cu.Cupon = cr.Cupon\n                                                WHERE\n                                                    te.Estado = 'Ingresado'\n                                                GROUP BY\n                                                    te.NDePedido");
        case 6:
          _yield$connection$que77 = _context35.sent;
          _yield$connection$que78 = _slicedToArray(_yield$connection$que77, 1);
          rows = _yield$connection$que78[0];
          res.json(rows);
          connection.end();
          _context35.next = 16;
          break;
        case 13:
          _context35.prev = 13;
          _context35.t0 = _context35["catch"](0);
          console.log('Error-getEnteredList: ', _context35.t0);
        case 16:
        case "end":
          return _context35.stop();
      }
    }, _callee35, null, [[0, 13]]);
  }));
  return function getEnteredList(_x69, _x70) {
    return _ref35.apply(this, arguments);
  };
}();
//!Entered
var getStatusList = exports.getStatusList = /*#__PURE__*/function () {
  var _ref36 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee36(req, res) {
    var connection, _yield$connection$que79, _yield$connection$que80, rows;
    return _regeneratorRuntime().wrap(function _callee36$(_context36) {
      while (1) switch (_context36.prev = _context36.next) {
        case 0:
          _context36.prev = 0;
          _context36.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context36.sent;
          _context36.next = 6;
          return connection.query("SELECT \n                                                    ES.NDePedido,\n                                                    ES.CodCliente,\n                                                    cli.Ferreteria AS Cliente,\n                                                    ES.FechaFactura,\n\n                                                    IFNULL(ROUND(TI.Valor,2),0) AS Valor,\n\n                                                    ES.TipoDePago,\n                                                    ES.Estado,\n\n                                                    IFNULL(ROUND(SA.ValorFinal,2),0) AS ValorFinal,\n\n                                                    ES.FechaDeEstado,\n                                                    ES.FechaDeEntrega,\n                                                    ES.ProcesoDelPedido,\n                                                    ES.CodColaborador,\n                                                    ES.TieneIva,\n                                                    ES.FechaVencimiento,\n                                                    ES.Repartidor,\n                                                    IFNULL(col.Nombre,'') AS NombreRepartidor,\n                                                    ES.NotaVenta,\n                                                    ES.NotaEntrega,\n                                                    ES.VECommerce,\n                                                    IFNULL(fElect.Prefijo,'') AS Prefijo,\n                                                    IFNULL(fElect.FacturaElectronica,'') AS FacturaElectronica\n                                                FROM tabladeestados ES\n\n                                                LEFT JOIN clientes cli \n                                                    ON cli.Cod = ES.CodCliente\n\n                                                LEFT JOIN colaboradores col \n                                                    ON col.Cod = ES.Repartidor\n\n                                                LEFT JOIN felectronica fElect \n                                                    ON fElect.NFactura = ES.NDePedido\n\n                                                /* ===== SUBCONSULTA: VALOR (INGRESADOS) ===== */\n                                                LEFT JOIN (\n                                                    SELECT\n                                                        ti.NDePedido,\n                                                        IFNULL(SUM(\n                                                            CASE \n                                                                WHEN ti.Cantidad > ti.APartirDe THEN\n                                                                    ti.Cantidad * ti.VrUnitario\n                                                                    * (1 - IFNULL(cu.Porcentaje,0)/100)\n                                                                    * (1 - IFNULL(ti.Porcentaje,0)/100)\n                                                                ELSE\n                                                                    ti.Cantidad * ti.VrUnitario\n                                                                    * (1 - IFNULL(cu.Porcentaje,0)/100)\n                                                            END\n                                                        ),0) AS Valor\n                                                    FROM tabladeingresados ti\n                                                    LEFT JOIN CRedimidos cr \n                                                        ON cr.NPedido = ti.NDePedido\n                                                    LEFT JOIN Cupones cu \n                                                        ON cu.Cupon = cr.Cupon\n                                                    GROUP BY ti.NDePedido\n                                                ) TI \n                                                    ON TI.NDePedido = ES.NDePedido\n\n                                                /* ===== SUBCONSULTA: VALOR FINAL (SALIDAS) ===== */\n                                                LEFT JOIN (\n                                                    SELECT\n                                                        sa.NDePedido,\n                                                        IFNULL(SUM(\n                                                            CASE \n                                                                WHEN sa.Cantidad > sa.APartirDe THEN\n                                                                    sa.Cantidad * sa.VrUnitario\n                                                                    * (1 - IFNULL(cu.Porcentaje,0)/100)\n                                                                    * (1 - IFNULL(sa.Porcentaje,0)/100)\n                                                                ELSE\n                                                                    sa.Cantidad * sa.VrUnitario\n                                                                    * (1 - IFNULL(cu.Porcentaje,0)/100)\n                                                            END\n                                                        ),0) AS ValorFinal\n                                                    FROM salidas sa\n                                                    LEFT JOIN CRedimidos cr \n                                                        ON cr.NPedido = sa.NDePedido\n                                                    LEFT JOIN Cupones cu \n                                                        ON cu.Cupon = cr.Cupon\n                                                    GROUP BY sa.NDePedido\n                                                ) SA \n                                                    ON SA.NDePedido = ES.NDePedido\n\n                                                ORDER BY ES.NDePedido DESC");
        case 6:
          _yield$connection$que79 = _context36.sent;
          _yield$connection$que80 = _slicedToArray(_yield$connection$que79, 1);
          rows = _yield$connection$que80[0];
          res.json(rows);
          connection.end();
          _context36.next = 16;
          break;
        case 13:
          _context36.prev = 13;
          _context36.t0 = _context36["catch"](0);
          console.log('Error-getStatusList: ', _context36.t0);
        case 16:
        case "end":
          return _context36.stop();
      }
    }, _callee36, null, [[0, 13]]);
  }));
  return function getStatusList(_x71, _x72) {
    return _ref36.apply(this, arguments);
  };
}();
var getPPSales = exports.getPPSales = /*#__PURE__*/function () {
  var _ref37 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee37(req, res) {
    var connection, _yield$connection$que81, _yield$connection$que82, rows;
    return _regeneratorRuntime().wrap(function _callee37$(_context37) {
      while (1) switch (_context37.prev = _context37.next) {
        case 0:
          _context37.prev = 0;
          _context37.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context37.sent;
          _context37.next = 6;
          return connection.query("SELECT\n                                                    te.NDePedido,\n                                                    te.FechaFactura,\n                                                    te.CodCliente,\n                                                    cli.Ferreteria,\n                                                    cli.Contacto,\n                                                    cli.Telefono,\n                                                    cli.Cel,\n                                                    te.TipoDePago,\n                                                    te.FechaVencimiento,\n                                                    IFNULL(ROUND(SUM(\n                                                    CASE WHEN\n                                                        sa.Cantidad > sa.APartirDe\n                                                    THEN\n                                                        sa.Cantidad * sa.VrUnitario * (1- IFNULL(cu.Porcentaje,0)/100) * (1 - IFNULL(sa.Porcentaje,0)/100)\n                                                    ELSE\n                                                        sa.Cantidad * sa.VrUnitario * (1- IFNULL(cu.Porcentaje,0)/100)\n                                                    END),2),0) AS Total\n                                                FROM\n                                                    tabladeestados AS te\n                                                LEFT JOIN\n                                                    clientes AS cli ON cli.Cod = te.CodCliente\n                                                LEFT JOIN\n                                                    salidas AS sa ON sa.NDePedido = te.NDePedido\n                                                LEFT JOIN\n                                                    CRedimidos AS cr ON cr.NPedido = te.NDePedido\n                                                LEFT JOIN\n                                                    Cupones AS cu ON cu.Cupon = cr.Cupon\n                                                WHERE\n                                                    te.Estado = 'Cerrado'\n                                                GROUP BY\n                                                    te.NDePedido\n                                                ORDER BY\n                                                    te.NDePedido DESC");
        case 6:
          _yield$connection$que81 = _context37.sent;
          _yield$connection$que82 = _slicedToArray(_yield$connection$que81, 1);
          rows = _yield$connection$que82[0];
          res.json(rows);
          connection.end();
          _context37.next = 16;
          break;
        case 13:
          _context37.prev = 13;
          _context37.t0 = _context37["catch"](0);
          console.log('Error-getPPSales: ', _context37.t0);
        case 16:
        case "end":
          return _context37.stop();
      }
    }, _callee37, null, [[0, 13]]);
  }));
  return function getPPSales(_x73, _x74) {
    return _ref37.apply(this, arguments);
  };
}();
var getPPSalesBalances = exports.getPPSalesBalances = /*#__PURE__*/function () {
  var _ref38 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee38(req, res) {
    var connection, _yield$connection$que83, _yield$connection$que84, rows;
    return _regeneratorRuntime().wrap(function _callee38$(_context38) {
      while (1) switch (_context38.prev = _context38.next) {
        case 0:
          _context38.prev = 0;
          _context38.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context38.sent;
          _context38.next = 6;
          return connection.query("SELECT\n                                                    ab.Consecutivo AS NDePedido,\n                                                    IFNULL(ROUND(SUM(ab.Abono),2),0) AS Saldo\n                                                FROM\n                                                    abonosventas AS ab\n                                                GROUP BY \n                                                    ab.Consecutivo\n                                                ORDER BY\n                                                    ab.Consecutivo DESC");
        case 6:
          _yield$connection$que83 = _context38.sent;
          _yield$connection$que84 = _slicedToArray(_yield$connection$que83, 1);
          rows = _yield$connection$que84[0];
          res.json(rows);
          connection.end();
          _context38.next = 16;
          break;
        case 13:
          _context38.prev = 13;
          _context38.t0 = _context38["catch"](0);
          console.log('Error-getPPSalesBalances: ', _context38.t0);
        case 16:
        case "end":
          return _context38.stop();
      }
    }, _callee38, null, [[0, 13]]);
  }));
  return function getPPSalesBalances(_x75, _x76) {
    return _ref38.apply(this, arguments);
  };
}();
var getCreditNotes = exports.getCreditNotes = /*#__PURE__*/function () {
  var _ref39 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee39(req, res) {
    var connection, _yield$connection$que85, _yield$connection$que86, rows;
    return _regeneratorRuntime().wrap(function _callee39$(_context39) {
      while (1) switch (_context39.prev = _context39.next) {
        case 0:
          _context39.prev = 0;
          _context39.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context39.sent;
          _context39.next = 6;
          return connection.query("SELECT\n                                                dev.Consecutivo,\n                                                dev.N_Pedido,\n                                                cli.Ferreteria,\n                                                DATE(dev.FechaInterna) AS FechaInterna,\n                                                dev.Total,\n                                                dev.Motivo,\n                                                dev.ConDian,\n                                                DATE(dev.FechaDian) AS FechaDian,\n                                                dev.FElectronica,\n                                                dev.ConsecutivoEn,\n                                                dev.PrefDian\n                                            FROM\n                                                Devoluciones AS dev\n                                                LEFT JOIN\n                                                    tabladeestados AS tde ON tde.NDePedido = dev.N_Pedido\n                                                LEFT JOIN\n                                                    clientes AS cli ON cli.Cod =  tde.CodCliente\n                                            ORDER BY\n                                                dev.Consecutivo DESC");
        case 6:
          _yield$connection$que85 = _context39.sent;
          _yield$connection$que86 = _slicedToArray(_yield$connection$que85, 1);
          rows = _yield$connection$que86[0];
          res.json(rows);
          connection.end();
          _context39.next = 16;
          break;
        case 13:
          _context39.prev = 13;
          _context39.t0 = _context39["catch"](0);
          console.log('Error-getCreditNotes: ', _context39.t0);
        case 16:
        case "end":
          return _context39.stop();
      }
    }, _callee39, null, [[0, 13]]);
  }));
  return function getCreditNotes(_x77, _x78) {
    return _ref39.apply(this, arguments);
  };
}();
var getPreparationList = exports.getPreparationList = /*#__PURE__*/function () {
  var _ref40 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee40(req, res) {
    var connection, orderList, _yield$connection$que87, _yield$connection$que88, rows;
    return _regeneratorRuntime().wrap(function _callee40$(_context40) {
      while (1) switch (_context40.prev = _context40.next) {
        case 0:
          _context40.prev = 0;
          _context40.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context40.sent;
          orderList = req.body.NPedidoList.join(',');
          _context40.next = 7;
          return connection.query("SELECT\n                                                    ti.NDePedido,\n                                                    te.CodCliente,\n                                                    cli.Ferreteria,\n                                                    ti.Codigo,\n                                                    pro.Descripcion,\n                                                    ti.VrUnitario,\n                                                    ti.Costo,\n                                                    pro.Ubicaci\xF3n,\n                                                    te.FechaDeEntrega,\n                                                    prov.Proovedor AS Proveedor,\n                                                    ti.Cantidad,\n                                                    movs.Disponible,\n                                                    ti.Porcentaje,\n                                                    ti.APartirDe\n                                                FROM tabladeingresados AS ti\n                                                LEFT JOIN productos AS pro ON ti.Codigo = pro.Cod\n                                                LEFT JOIN proovedores as prov On prov.Cod = pro.CodProovedor\n                                                LEFT JOIN tabladeestados AS te ON te.NDePedido = ti.NDePedido\n                                                LEFT JOIN clientes AS cli ON cli.Cod = te.CodCliente\n                                                LEFT JOIN (\n                                                    SELECT\n                                                        Codigo,\n                                                        SUM(CASE \n                                                            WHEN tipo = 'entrada' THEN Cantidad\n                                                            WHEN tipo = 'salida' THEN -Cantidad\n                                                            ELSE 0 END) AS Cantidad,\n                                                        SUM(CASE \n                                                            WHEN tipo = 'entrada' THEN Cantidad\n                                                            WHEN tipo = 'salida' THEN -Cantidad\n                                                            WHEN tipo = 'reservado' THEN -Cantidad\n                                                            ELSE 0 END) AS Disponible\n                                                    FROM (\n                                                        SELECT Codigo, 'entrada' AS tipo, Cantidad FROM entradas\n                                                        UNION ALL\n                                                        SELECT Codigo, 'salida' AS tipo, Cantidad FROM salidas\n                                                        UNION ALL\n                                                        SELECT f.Codigo, 'reservado' AS tipo, f.Cantidad\n                                                        FROM flujodeestados f\n                                                        WHERE f.Incompleto = '0'\n                                                        AND f.NDePedido IN (\n                                                            SELECT NDePedido FROM tabladeestados WHERE Estado <> 'Anulado'\n                                                        )\n                                                    ) AS movimientos\n                                                    GROUP BY Codigo\n                                                ) AS movs ON movs.Codigo = ti.Codigo\n                                                WHERE ti.NDePedido IN (?) ORDER BY FIELD(ti.NDePedido, ".concat(orderList, ")"), [req.body.NPedidoList]);
        case 7:
          _yield$connection$que87 = _context40.sent;
          _yield$connection$que88 = _slicedToArray(_yield$connection$que87, 1);
          rows = _yield$connection$que88[0];
          res.json(rows);
          connection.end();
          _context40.next = 17;
          break;
        case 14:
          _context40.prev = 14;
          _context40.t0 = _context40["catch"](0);
          console.log('Error-getPreparationList: ', _context40.t0);
        case 17:
        case "end":
          return _context40.stop();
      }
    }, _callee40, null, [[0, 14]]);
  }));
  return function getPreparationList(_x79, _x80) {
    return _ref40.apply(this, arguments);
  };
}();
var postStateFlow = exports.postStateFlow = /*#__PURE__*/function () {
  var _ref41 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee41(req, res) {
    var connection, placeholders, NewFlujoDeEstados, NewFlujoDeEstadosValues, UpdateStates, UpdateStatesValues;
    return _regeneratorRuntime().wrap(function _callee41$(_context41) {
      while (1) switch (_context41.prev = _context41.next) {
        case 0:
          _context41.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context41.sent;
          _context41.prev = 3;
          _context41.next = 6;
          return connection.beginTransaction();
        case 6:
          //INICIA LA TRANSACCIÓN
          placeholders = req.body.FlowData.map(function () {
            return '(?, ?, ?, ?, ?, ?, ?, ?, ?)';
          }).join(', ');
          NewFlujoDeEstados = "INSERT INTO flujodeestados (\n                                                            NDePedido,\n                                                            Cantidad,\n                                                            Codigo,\n                                                            VrUnitario,\n                                                            Costo,\n                                                            Hora,\n                                                            Incompleto,\n                                                            Porcentaje,\n                                                            APartirDe\n                                                            )\n                                                VALUES ".concat(placeholders);
          NewFlujoDeEstadosValues = req.body.FlowData.flat();
          _context41.next = 11;
          return connection.execute(NewFlujoDeEstados, NewFlujoDeEstadosValues);
        case 11:
          UpdateStates = "UPDATE tabladeestados\n                                SET Estado = 'Alistado',\n                                    FechaDeEstado = ?\n                                WHERE NDePedido IN (".concat(req.body.NpedidoList.map(function () {
            return '?';
          }).join(', '), ");\n                                ");
          UpdateStatesValues = [req.body.Date + ' ' + req.body.Hour].concat(_toConsumableArray(req.body.NpedidoList));
          _context41.next = 15;
          return connection.execute(UpdateStates, UpdateStatesValues);
        case 15:
          _context41.next = 17;
          return connection.commit();
        case 17:
          // GUARDA TODO SI NADA FALLÓ
          res.status(200).json({
            sucess: true,
            error: ''
          });
          _context41.next = 26;
          break;
        case 20:
          _context41.prev = 20;
          _context41.t0 = _context41["catch"](3);
          _context41.next = 24;
          return connection.rollback();
        case 24:
          //DESHACE TODO LO QUE SE INSERTÓ
          console.log('Error-postStateFlow: ', _context41.t0);
          res.status(500).json({
            sucess: false,
            error: _context41.t0
          });
        case 26:
          _context41.prev = 26;
          connection.end();
          return _context41.finish(26);
        case 29:
        case "end":
          return _context41.stop();
      }
    }, _callee41, null, [[3, 20, 26, 29]]);
  }));
  return function postStateFlow(_x81, _x82) {
    return _ref41.apply(this, arguments);
  };
}();
var getPendingList = exports.getPendingList = /*#__PURE__*/function () {
  var _ref42 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee42(req, res) {
    var connection, _yield$connection$que89, _yield$connection$que90, rows;
    return _regeneratorRuntime().wrap(function _callee42$(_context42) {
      while (1) switch (_context42.prev = _context42.next) {
        case 0:
          _context42.prev = 0;
          _context42.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context42.sent;
          _context42.next = 6;
          return connection.query("SELECT\n                                                ROW_NUMBER() OVER (ORDER BY flu.Codigo)-1 AS indice,\n                                                flu.cantidad,\n                                                flu.Codigo,\n                                                p.Descripcion,\n                                                p.PCosto,\n                                                p.Iva,\n                                                cli.Ferreteria,\n                                                pro.cod AS CodPro,\n                                                pro.Proovedor,\n                                                pro.Telefono,\n                                                pro.Direccion,\n                                                te.FechaDeEntrega\n                                            FROM\n                                                flujodeestados AS flu \n                                            JOIN\n                                                tabladeestados AS te ON te.NDePedido = flu.NDePedido\n                                            JOIN\n                                                productos AS p ON flu.Codigo = p.Cod\n                                            LEFT JOIN\n                                                proovedores AS pro ON pro.cod = p.CodProovedor\n                                            LEFT JOIN\n                                                clientes AS cli ON cli.Cod = te.CodCliente\n                                            WHERE\n                                                (te.Estado = 'Alistado' OR te.Estado = 'Verificado') AND flu.Incompleto = 1");
        case 6:
          _yield$connection$que89 = _context42.sent;
          _yield$connection$que90 = _slicedToArray(_yield$connection$que89, 1);
          rows = _yield$connection$que90[0];
          res.json(rows);
          connection.end();
          _context42.next = 16;
          break;
        case 13:
          _context42.prev = 13;
          _context42.t0 = _context42["catch"](0);
          console.log('Error-getPendingList: ', _context42.t0);
        case 16:
        case "end":
          return _context42.stop();
      }
    }, _callee42, null, [[0, 13]]);
  }));
  return function getPendingList(_x83, _x84) {
    return _ref42.apply(this, arguments);
  };
}();
var postOntheRoute = exports.postOntheRoute = /*#__PURE__*/function () {
  var _ref43 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee43(req, res) {
    var connection, updateDelivery, updateDeliveryValues;
    return _regeneratorRuntime().wrap(function _callee43$(_context43) {
      while (1) switch (_context43.prev = _context43.next) {
        case 0:
          _context43.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context43.sent;
          _context43.prev = 3;
          updateDelivery = "UPDATE \n                                        tabladeestados\n                                    SET \n                                        ProcesoDelPedido = 'En ruta',\n                                        Repartidor = ?\n                                    WHERE\n                                        NDePedido = ?";
          updateDeliveryValues = [req.body.CodDelivery, req.body.NDePedido];
          _context43.next = 8;
          return connection.execute(updateDelivery, updateDeliveryValues);
        case 8:
          res.status(200).json({
            sucess: true,
            error: ''
          });
          _context43.next = 15;
          break;
        case 11:
          _context43.prev = 11;
          _context43.t0 = _context43["catch"](3);
          console.log('Error-postStateFlow: ', _context43.t0);
          res.status(500).json({
            sucess: false,
            error: _context43.t0
          });
        case 15:
          _context43.prev = 15;
          connection.end();
          return _context43.finish(15);
        case 18:
        case "end":
          return _context43.stop();
      }
    }, _callee43, null, [[3, 11, 15, 18]]);
  }));
  return function postOntheRoute(_x85, _x86) {
    return _ref43.apply(this, arguments);
  };
}();
var getSpecificPurchase = exports.getSpecificPurchase = /*#__PURE__*/function () {
  var _ref44 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee44(req, res) {
    var connection, _yield$connection$que91, _yield$connection$que92, rows;
    return _regeneratorRuntime().wrap(function _callee44$(_context44) {
      while (1) switch (_context44.prev = _context44.next) {
        case 0:
          _context44.prev = 0;
          _context44.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context44.sent;
          _context44.next = 6;
          return connection.query("SELECT\n                                                en.Cantidad,\n                                                en.Codigo,\n                                                en.Descripci\xF3n AS Descripcion,\n                                                en.Costo - en.Iva AS Costo,\n                                                pro.Iva AS Iva,\n                                                en.Costo AS UIva,\n                                                en.Cantidad *(en.Costo) AS Total,\n                                                en.CostoLP\n                                            FROM\n                                                entradas AS en\n                                                LEFT JOIN productos AS pro ON pro.Cod = en.Codigo\n                                            WHERE\n                                                en.Consecutivo = ?", [req.body.Consecutivo]);
        case 6:
          _yield$connection$que91 = _context44.sent;
          _yield$connection$que92 = _slicedToArray(_yield$connection$que91, 1);
          rows = _yield$connection$que92[0];
          res.json(rows);
          connection.end();
          _context44.next = 16;
          break;
        case 13:
          _context44.prev = 13;
          _context44.t0 = _context44["catch"](0);
          console.log('Error-getSpecificPurchase: ', _context44.t0);
        case 16:
        case "end":
          return _context44.stop();
      }
    }, _callee44, null, [[0, 13]]);
  }));
  return function getSpecificPurchase(_x87, _x88) {
    return _ref44.apply(this, arguments);
  };
}();

//!Alias
var getAliasList = exports.getAliasList = /*#__PURE__*/function () {
  var _ref45 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee45(req, res) {
    var connection, _yield$connection$que93, _yield$connection$que94, rows;
    return _regeneratorRuntime().wrap(function _callee45$(_context45) {
      while (1) switch (_context45.prev = _context45.next) {
        case 0:
          _context45.prev = 0;
          _context45.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context45.sent;
          _context45.next = 6;
          return connection.query("SELECT\n                                                    Alias\n                                                FROM\n                                                    alias\n                                                WHERE\n                                                    Cod = ?", [req.body.Cod]);
        case 6:
          _yield$connection$que93 = _context45.sent;
          _yield$connection$que94 = _slicedToArray(_yield$connection$que93, 1);
          rows = _yield$connection$que94[0];
          res.json(rows);
          connection.end();
          _context45.next = 16;
          break;
        case 13:
          _context45.prev = 13;
          _context45.t0 = _context45["catch"](0);
          console.log('Error-getAliasList: ', _context45.t0);
        case 16:
        case "end":
          return _context45.stop();
      }
    }, _callee45, null, [[0, 13]]);
  }));
  return function getAliasList(_x89, _x90) {
    return _ref45.apply(this, arguments);
  };
}();
var postNewAlias = exports.postNewAlias = /*#__PURE__*/function () {
  var _ref46 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee46(req, res) {
    var connection, newAlias, newAliasValues;
    return _regeneratorRuntime().wrap(function _callee46$(_context46) {
      while (1) switch (_context46.prev = _context46.next) {
        case 0:
          _context46.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context46.sent;
          _context46.prev = 3;
          newAlias = "INSERT INTO\n                                    alias\n                                VALUES (?,?)";
          newAliasValues = [req.body.Cod, req.body.Alias];
          _context46.next = 8;
          return connection.execute(newAlias, newAliasValues);
        case 8:
          res.status(200).json({
            sucess: true,
            error: ''
          });
          _context46.next = 15;
          break;
        case 11:
          _context46.prev = 11;
          _context46.t0 = _context46["catch"](3);
          console.log('Error-postNewAlias: ', _context46.t0);
          res.status(500).json({
            sucess: false,
            error: _context46.t0
          });
        case 15:
          _context46.prev = 15;
          connection.end();
          return _context46.finish(15);
        case 18:
        case "end":
          return _context46.stop();
      }
    }, _callee46, null, [[3, 11, 15, 18]]);
  }));
  return function postNewAlias(_x91, _x92) {
    return _ref46.apply(this, arguments);
  };
}();
var postDeleteAlias = exports.postDeleteAlias = /*#__PURE__*/function () {
  var _ref47 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee47(req, res) {
    var connection, newAlias, newAliasValues;
    return _regeneratorRuntime().wrap(function _callee47$(_context47) {
      while (1) switch (_context47.prev = _context47.next) {
        case 0:
          _context47.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context47.sent;
          _context47.prev = 3;
          newAlias = "DELETE FROM alias WHERE Cod = ? AND Alias = ?";
          newAliasValues = [req.body.Cod, req.body.Alias];
          _context47.next = 8;
          return connection.execute(newAlias, newAliasValues);
        case 8:
          res.status(200).json({
            sucess: true,
            error: ''
          });
          _context47.next = 15;
          break;
        case 11:
          _context47.prev = 11;
          _context47.t0 = _context47["catch"](3);
          console.log('Error-postDeleteAlias: ', _context47.t0);
          res.status(500).json({
            sucess: false,
            error: _context47.t0
          });
        case 15:
          _context47.prev = 15;
          connection.end();
          return _context47.finish(15);
        case 18:
        case "end":
          return _context47.stop();
      }
    }, _callee47, null, [[3, 11, 15, 18]]);
  }));
  return function postDeleteAlias(_x93, _x94) {
    return _ref47.apply(this, arguments);
  };
}();
//!Verify
var getOrderHeader = exports.getOrderHeader = /*#__PURE__*/function () {
  var _ref48 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee48(req, res) {
    var connection, _yield$connection$que95, _yield$connection$que96, rows;
    return _regeneratorRuntime().wrap(function _callee48$(_context48) {
      while (1) switch (_context48.prev = _context48.next) {
        case 0:
          _context48.prev = 0;
          _context48.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context48.sent;
          _context48.next = 6;
          return connection.query("SELECT\n                                                    te.NDePedido,\n                                                    cli.Cod,\n                                                    cli.Ferreteria,\n                                                    cli.Nit,\n                                                    cli.Contacto,\n                                                    cli.Direccion,\n                                                    cli.Telefono,\n                                                    cli.Cel,\n                                                    cli.Email,\n                                                    cli.Barrio,\n                                                    cli.Pos,\n                                                    te.CodColaborador,\n                                                    CONCAT(col.Nombre, ' ', col.Apellido) AS colaborador,\n                                                    te.Estado,\n                                                    te.FechaDeEntrega,\n                                                    te.FechaFactura,\n                                                    te.ProcesoDelPedido,\n                                                    te.FechaVencimiento,\n                                                    te.TipoDePago,\n                                                    te.TieneIva,\n                                                    te.NotaVenta,\n                                                    te.NotaEntrega,\n                                                    te.VECommerce,\n                                                    IFNULL(cu.Porcentaje,0) AS CuPorcentaje\n                                                FROM\n                                                    tabladeestados AS te\n                                                LEFT JOIN\n                                                    clientes AS cli ON te.CodCliente = cli.Cod\n                                                LEFT JOIN\n                                                    colaboradores AS col ON te.CodColaborador = col.Cod\n                                                LEFT JOIN\n                                                    CRedimidos AS cr ON cr.NPedido = te.NDePedido\n                                                LEFT JOIN\n                                                    Cupones AS cu ON cu.Cupon = cr.Cupon\n                                                WHERE\n                                                    te.NDePedido = ?", [req.body.NDePedido]);
        case 6:
          _yield$connection$que95 = _context48.sent;
          _yield$connection$que96 = _slicedToArray(_yield$connection$que95, 1);
          rows = _yield$connection$que96[0];
          res.json(rows);
          connection.end();
          _context48.next = 16;
          break;
        case 13:
          _context48.prev = 13;
          _context48.t0 = _context48["catch"](0);
          console.log('Error-getOrderHeader: ', _context48.t0);
        case 16:
        case "end":
          return _context48.stop();
      }
    }, _callee48, null, [[0, 13]]);
  }));
  return function getOrderHeader(_x95, _x96) {
    return _ref48.apply(this, arguments);
  };
}();
var getOrderDetail = exports.getOrderDetail = /*#__PURE__*/function () {
  var _ref49 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee49(req, res) {
    var connection, query, data, _yield$connection$que97, _yield$connection$que98, rows;
    return _regeneratorRuntime().wrap(function _callee49$(_context49) {
      while (1) switch (_context49.prev = _context49.next) {
        case 0:
          _context49.prev = 0;
          _context49.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context49.sent;
          query = '';
          if (req.body.status === 'Ingresado') {
            query = "SELECT\n                        ti.Cantidad AS Cantidad,\n                        ti.Codigo AS Codigo,\n                        pro.Descripcion,\n                        ti.VrUnitario,\n                        ti.Costo,\n                        pro.Iva,\n                        ti.ApartirDe AS DesApartirDe,\n                        ti.Porcentaje AS DesPorcentaje\n                    FROM\n                        tabladeingresados AS ti\n                    LEFT JOIN\n                        productos AS pro ON ti.Codigo = pro.Cod\n                    WHERE\n                        ti.NDePedido = ?";
          } else if (req.body.status === 'Cerrado') {
            query = "SELECT\n                        sa.Cantidad,\n                        sa.Codigo,\n                        sa.Descipci\xF3n AS Descripcion,\n                        sa.VrUnitario,\n                        sa.Costo,\n                        sa.TieneIVA as Iva,\n                        sa.ApartirDe AS DesApartirDe,\n                        sa.Porcentaje AS DesPorcentaje\n                    FROM\n                        salidas AS sa\n                    WHERE\n                        sa.NDePedido = ?";
          } else {
            query = "SELECT\n                        flu.Cantidad AS Cantidad,\n                        flu.Codigo AS Codigo,\n                        pro.Descripcion AS Descripcion,\n                        flu.VrUnitario,\n                        flu.Costo,\n                        pro.Iva,\n                        pro.SubCategoria AS IDSubCategoria,\n                        subc.SubCategoria,\n                        pro.CodProovedor AS CodProveedor,\n                        prov.Proovedor AS Proveedor,\n                        flu.ApartirDe AS DesApartirDe,\n                        flu.Porcentaje AS DesPorcentaje,\n                        flu.Incompleto AS Estado\n                    FROM\n                        flujodeestados AS flu\n                    LEFT JOIN\n                        productos AS pro ON pro.Cod = flu.Codigo\n                    LEFT JOIN\n                        proovedores AS prov ON prov.Cod = pro.CodProovedor\n                    LEFT JOIN\n                        subcategorias AS subc ON subc.IDSubCategoria = pro.SubCategoria\n                    WHERE\n                        flu.NDePedido = ?";
          }
          data = [req.body.NDeFactura];
          _context49.next = 9;
          return connection.query(query, data);
        case 9:
          _yield$connection$que97 = _context49.sent;
          _yield$connection$que98 = _slicedToArray(_yield$connection$que97, 1);
          rows = _yield$connection$que98[0];
          res.json(rows);
          connection.end();
          _context49.next = 19;
          break;
        case 16:
          _context49.prev = 16;
          _context49.t0 = _context49["catch"](0);
          console.log('Error-getOrderDetail: ', _context49.t0);
        case 19:
        case "end":
          return _context49.stop();
      }
    }, _callee49, null, [[0, 16]]);
  }));
  return function getOrderDetail(_x97, _x98) {
    return _ref49.apply(this, arguments);
  };
}();
var updateOrder = exports.updateOrder = /*#__PURE__*/function () {
  var _ref50 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee50(req, res) {
    var connection, deleteData, query, data, ActualizarEstado, _yield$connection$que99, _yield$connection$que100, rows, _yield$connection$que101, _yield$connection$que102, _deleteData, _query, _data, _yield$connection$que103, _yield$connection$que104, _ActualizarEstado, _yield$connection$que105, _yield$connection$que106, _rows2;
    return _regeneratorRuntime().wrap(function _callee50$(_context50) {
      while (1) switch (_context50.prev = _context50.next) {
        case 0:
          _context50.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context50.sent;
          _context50.prev = 3;
          _context50.next = 6;
          return connection.beginTransaction();
        case 6:
          if (!(req.body.Estado === 'Ingresado')) {
            _context50.next = 23;
            break;
          }
          _context50.next = 9;
          return connection.query("\n                DELETE FROM\n                    tabladeingresados\n                WHERE\n                    NDePedido = ?\n                ", [req.body.NDePedido]);
        case 9:
          deleteData = _context50.sent;
          query = "INSERT INTO\n                        tabladeingresados\n                    VALUES\n                        ".concat(req.body.Order.map(function () {
            return '(?,?,?,?,?,?,?)';
          }).join(', '), "\n                    ");
          data = req.body.Order.flatMap(function (product) {
            return [req.body.NDePedido, product.Cantidad, product.Codigo, product.VrUnitario, product.Costo, product.DesPorcentaje, product.DesApartirDe];
          });
          _context50.next = 14;
          return connection.query("UPDATE\n                                                                    tabladeestados\n                                                                SET \n                                                                    FechaDeEstado = ?,\n                                                                    NotaVenta = ?,\n                                                                    NotaEntrega = ?,\n                                                                    TieneIva = ?\n                                                                WHERE\n                                                                    NDePedido = ?", [req.body.Fecha, req.body.NotaVenta, req.body.NotaEntrega, req.body.Iva, req.body.NDePedido]);
        case 14:
          ActualizarEstado = _context50.sent;
          _context50.next = 17;
          return connection.query(query, data);
        case 17:
          _yield$connection$que99 = _context50.sent;
          _yield$connection$que100 = _slicedToArray(_yield$connection$que99, 1);
          rows = _yield$connection$que100[0];
          res.status(200).json({
            sucess: true,
            error: ''
          });
          _context50.next = 41;
          break;
        case 23:
          _context50.next = 25;
          return connection.query("\n                DELETE FROM\n                    flujodeestados\n                WHERE\n                    NDePedido = ?\n                ", [req.body.NDePedido]);
        case 25:
          _yield$connection$que101 = _context50.sent;
          _yield$connection$que102 = _slicedToArray(_yield$connection$que101, 1);
          _deleteData = _yield$connection$que102[0];
          _query = "INSERT INTO\n                            flujodeestados\n                        VALUES\n                            ".concat(req.body.Order.map(function () {
            return '(?,?,?,?,?,?,?,?,?)';
          }).join(', '), "\n                        ");
          _data = req.body.Order.flatMap(function (product) {
            return [req.body.NDePedido, product.Cantidad, product.Codigo, product.VrUnitario, product.Costo, req.body.Hora, product.Estado, product.DesPorcentaje, product.DesApartirDe];
          });
          _context50.next = 32;
          return connection.query("UPDATE\n                                                                    tabladeestados\n                                                                SET \n                                                                    Estado = 'Verificado',\n                                                                    FechaDeEstado = ?,\n                                                                    NotaVenta = ?,\n                                                                    NotaEntrega = ?,\n                                                                    TieneIva = ?,\n                                                                    ProcesoDelPedido = ?\n                                                                WHERE\n                                                                    NDePedido = ?", [req.body.Fecha, req.body.NotaVenta, req.body.NotaEntrega, req.body.Iva, req.body.Impreso, req.body.NDePedido]);
        case 32:
          _yield$connection$que103 = _context50.sent;
          _yield$connection$que104 = _slicedToArray(_yield$connection$que103, 1);
          _ActualizarEstado = _yield$connection$que104[0];
          _context50.next = 37;
          return connection.query(_query, _data);
        case 37:
          _yield$connection$que105 = _context50.sent;
          _yield$connection$que106 = _slicedToArray(_yield$connection$que105, 1);
          _rows2 = _yield$connection$que106[0];
          res.status(200).json({
            sucess: true,
            error: ''
          });
        case 41:
          _context50.next = 43;
          return connection.commit();
        case 43:
          // GUARDA TODO SI NADA FALLÓ
          connection.end();
          _context50.next = 52;
          break;
        case 46:
          _context50.prev = 46;
          _context50.t0 = _context50["catch"](3);
          _context50.next = 50;
          return connection.rollback();
        case 50:
          //DESHACE TODO LO QUE SE INSERTÓ
          console.log('Error-updateOrder: ', _context50.t0);
          res.status(500).json({
            sucess: false,
            error: _context50.t0.message
          });
        case 52:
          _context50.prev = 52;
          connection.end();
          return _context50.finish(52);
        case 55:
        case "end":
          return _context50.stop();
      }
    }, _callee50, null, [[3, 46, 52, 55]]);
  }));
  return function updateOrder(_x99, _x100) {
    return _ref50.apply(this, arguments);
  };
}();
var postCloseOrder = exports.postCloseOrder = /*#__PURE__*/function () {
  var _ref51 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee51(req, res) {
    var connection, EnvioASalidas, EnvioASalidasData, _yield$connection$que107, _yield$connection$que108, rows, _yield$connection$que109, _yield$connection$que110, States, _yield$connection$que111, _yield$connection$que112, toPurchasestable, toComprasPorIngresar, toComprasPorIngresarData, _yield$connection$que113, _yield$connection$que114, toComprasPI, _yield$connection$que115, _yield$connection$que116, DeteleFDeEstados;
    return _regeneratorRuntime().wrap(function _callee51$(_context51) {
      while (1) switch (_context51.prev = _context51.next) {
        case 0:
          _context51.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context51.sent;
          _context51.prev = 3;
          _context51.next = 6;
          return connection.beginTransaction();
        case 6:
          //INICIA LA TRANSACCIÓN
          //Introduce the data into the table salidas
          EnvioASalidas = "INSERT INTO\n                                    salidas\n                                VALUES ".concat(req.body.Order.map(function () {
            return '(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
          }).join(', '), "\n                                ");
          EnvioASalidasData = req.body.Order.flatMap(function (product) {
            return [req.body.NDePedido, product.Cantidad, product.Codigo, product.Descripcion, product.VrUnitario, product.Costo, product.IDSubCategoria, product.SubCategoria, product.CodProveedor, product.Proveedor, req.body.CodCliente, req.body.Cliente, req.body.CodColaborador, req.body.Colaborador, req.body.FechaDeIngreso, product.Iva, req.body.CodResponsable, req.body.Responsable, product.DesPorcentaje, product.DesApartirDe];
          });
          _context51.next = 10;
          return connection.query(EnvioASalidas, EnvioASalidasData);
        case 10:
          _yield$connection$que107 = _context51.sent;
          _yield$connection$que108 = _slicedToArray(_yield$connection$que107, 1);
          rows = _yield$connection$que108[0];
          _context51.next = 15;
          return connection.query("UPDATE\n                                                    tabladeestados AS te\n                                                SET\n                                                    te.Estado = 'Cerrado',\n                                                    te.ProcesoDelPedido = '',\n                                                    te.FechaDeEstado = ?\n                                                WHERE\n                                                    te.NDePedido = ?", [req.body.Fecha, req.body.NDePedido]);
        case 15:
          _yield$connection$que109 = _context51.sent;
          _yield$connection$que110 = _slicedToArray(_yield$connection$que109, 1);
          States = _yield$connection$que110[0];
          if (!(req.body.ClientPos === 1)) {
            _context51.next = 31;
            break;
          }
          _context51.next = 21;
          return connection.query("\n                                                            INSERT INTO BD_Pos.cabeceracompras (\n                                                                    IdFerreteria,\n                                                                    ConInterno,\n                                                                    NPreFactura,\n                                                                    FacturaElectronica,\n                                                                    Estado,\n                                                                    Fecha\n                                                                )\n                                                                SELECT \n                                                                    ? AS CodCliente,\n                                                                    COALESCE(MAX(ConInterno), 0) + 1 AS ConInterno,\n                                                                    ? AS NDePedido,\n                                                                    ? AS FacturaElectronica,\n                                                                    ? AS Estado,\n                                                                    ? AS Fecha\n                                                                FROM\n                                                                    BD_Pos.cabeceracompras\n                                                                WHERE\n                                                                    IdFerreteria = ?\n                                                                                                                    ", [req.body.CodCliente, req.body.NDePedido, '', 'Por ingresar', req.body.FechaDeIngreso, req.body.CodCliente // <- este es para el WHERE IdFerreteria = ?
          ]);
        case 21:
          _yield$connection$que111 = _context51.sent;
          _yield$connection$que112 = _slicedToArray(_yield$connection$que111, 1);
          toPurchasestable = _yield$connection$que112[0];
          toComprasPorIngresar = "INSERT INTO\n                                                BD_Pos.comprasporingresar\n                                            VALUES ".concat(req.body.Order.map(function () {
            return '(?,?,?,?,?,?)';
          }).join(', '), "\n                                            ");
          toComprasPorIngresarData = req.body.Order.flatMap(function (product) {
            return [req.body.CodCliente, req.body.NDePedido, product.Cantidad, product.Codigo, product.VrUnitario, 0];
          });
          _context51.next = 28;
          return connection.query(toComprasPorIngresar, toComprasPorIngresarData);
        case 28:
          _yield$connection$que113 = _context51.sent;
          _yield$connection$que114 = _slicedToArray(_yield$connection$que113, 1);
          toComprasPI = _yield$connection$que114[0];
        case 31:
          _context51.next = 33;
          return connection.query("DELETE FROM\n                                                                flujodeestados\n                                                            WHERE\n                                                                NDePedido = ?", [req.body.NDePedido]);
        case 33:
          _yield$connection$que115 = _context51.sent;
          _yield$connection$que116 = _slicedToArray(_yield$connection$que115, 1);
          DeteleFDeEstados = _yield$connection$que116[0];
          _context51.next = 38;
          return connection.commit();
        case 38:
          // GUARDA TODO SI NADA FALLÓ
          res.status(200).json({
            sucess: true,
            error: ''
          });
          _context51.next = 47;
          break;
        case 41:
          _context51.prev = 41;
          _context51.t0 = _context51["catch"](3);
          _context51.next = 45;
          return connection.rollback();
        case 45:
          //DESHACE TODO LO QUE SE INSERTÓ
          console.log('Error-updateOrder: ', _context51.t0);
          res.status(500).json({
            sucess: false,
            error: _context51.t0
          });
        case 47:
          _context51.prev = 47;
          connection.end();
          return _context51.finish(47);
        case 50:
        case "end":
          return _context51.stop();
      }
    }, _callee51, null, [[3, 41, 47, 50]]);
  }));
  return function postCloseOrder(_x101, _x102) {
    return _ref51.apply(this, arguments);
  };
}();
var postAnuul = exports.postAnuul = /*#__PURE__*/function () {
  var _ref52 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee52(req, res) {
    var connection, _yield$connection$que117, _yield$connection$que118, States;
    return _regeneratorRuntime().wrap(function _callee52$(_context52) {
      while (1) switch (_context52.prev = _context52.next) {
        case 0:
          _context52.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context52.sent;
          _context52.prev = 3;
          _context52.next = 6;
          return connection.query("UPDATE\n                                                    tabladeestados AS te\n                                                SET\n                                                    te.Estado = 'Anulado',\n                                                    te.ProcesoDelPedido = '',\n                                                    te.FechaDeEstado = ?\n                                                WHERE\n                                                    te.NDePedido = ?", [req.body.Fecha, req.body.NDePedido]);
        case 6:
          _yield$connection$que117 = _context52.sent;
          _yield$connection$que118 = _slicedToArray(_yield$connection$que117, 1);
          States = _yield$connection$que118[0];
          res.status(200).json({
            sucess: true,
            error: ''
          });
          _context52.next = 16;
          break;
        case 12:
          _context52.prev = 12;
          _context52.t0 = _context52["catch"](3);
          console.log('Error-updateOrder: ', _context52.t0);
          res.status(500).json({
            sucess: false,
            error: _context52.t0
          });
        case 16:
          _context52.prev = 16;
          connection.end();
          return _context52.finish(16);
        case 19:
        case "end":
          return _context52.stop();
      }
    }, _callee52, null, [[3, 12, 16, 19]]);
  }));
  return function postAnuul(_x103, _x104) {
    return _ref52.apply(this, arguments);
  };
}();
var getWeekly = exports.getWeekly = /*#__PURE__*/function () {
  var _ref53 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee53(req, res) {
    var connection, _yield$connection$que119, _yield$connection$que120, HeaderWeekly, pedidos, _yield$connection$que121, _yield$connection$que122, missingWeekly, missingMap, EnvioASalidasData;
    return _regeneratorRuntime().wrap(function _callee53$(_context53) {
      while (1) switch (_context53.prev = _context53.next) {
        case 0:
          _context53.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context53.sent;
          _context53.prev = 3;
          _context53.next = 6;
          return connection.query("SELECT\n                                                            cli.Ferreteria,\n                                                            cli.Barrio AS Barrio,\n                                                            cli.Ruta,\n                                                            ru.nombreRuta,\n                                                            te.FechaDeEntrega AS Fecha,\n                                                            DAYNAME(te.FechaDeEntrega) AS DiaSemana,\n                                                            YEARWEEK(FechaFactura, 1) AS AnioSemana,\n                                                            co.Nombre AS asesor,\n                                                            SUM(fe.cantidad*fe.VrUnitario) AS valor,\n                                                            te.NDePedido,\n                                                            te.ProcesoDelPedido,\n                                                            te.Estado,\n                                                            COUNT(fe.NDePedido) AS Nproductos,\n                                                            te.VECommerce\n                                                        FROM\n                                                            tabladeestados AS te\n                                                        JOIN\t\n                                                            clientes AS cli ON cli.Cod = te.CodCliente\n                                                        JOIN\n                                                            colaboradores AS co ON co.Cod = cli.CodVendedor\n                                                        JOIN\n                                                            flujodeestados AS fe ON fe.NDePedido = te.NDePedido\n                                                        LEFT JOIN\n                                                            rutas AS ru ON ru.codRuta = cli.Ruta\n                                                        WHERE\n                                                            te.Estado <> 'Cerrado' AND te.Estado <> 'Anulado'\n                                                        GROUP BY\n                                                            te.NDePedido\n                                                    ");
        case 6:
          _yield$connection$que119 = _context53.sent;
          _yield$connection$que120 = _slicedToArray(_yield$connection$que119, 1);
          HeaderWeekly = _yield$connection$que120[0];
          pedidos = HeaderWeekly.map(function (r) {
            return r.NDePedido;
          });
          if (!(pedidos.length === 0)) {
            _context53.next = 12;
            break;
          }
          return _context53.abrupt("return", res.json([]));
        case 12:
          _context53.next = 14;
          return connection.query("SELECT \n                                                            flu.NDePedido,                        \n                                                            flu.cantidad,\n                                                            flu.Codigo,\n                                                            p.Descripcion\n                                                        FROM\n                                                            flujodeestados AS flu \n                                                        JOIN\n                                                            productos AS p ON flu.Codigo = p.Cod\n                                                        WHERE\n                                                            flu.NDePedido IN (?) AND flu.Incompleto = 1", [pedidos]);
        case 14:
          _yield$connection$que121 = _context53.sent;
          _yield$connection$que122 = _slicedToArray(_yield$connection$que121, 1);
          missingWeekly = _yield$connection$que122[0];
          // 4. Agrupamos missing por pedido
          missingMap = {};
          missingWeekly.forEach(function (item) {
            if (!missingMap[item.NDePedido]) {
              missingMap[item.NDePedido] = [];
            }
            missingMap[item.NDePedido].push({
              cantidad: item.cantidad,
              codigo: item.Codigo,
              descripcion: item.Descripcion
            });
          });

          // 5. Añadimos Missing a cada header
          EnvioASalidasData = HeaderWeekly.map(function (order) {
            return _objectSpread(_objectSpread({}, order), {}, {
              Missing: missingMap[order.NDePedido] || [] // si no hay faltantes, array vacío
            });
          });
          res.json(EnvioASalidasData);
          _context53.next = 27;
          break;
        case 23:
          _context53.prev = 23;
          _context53.t0 = _context53["catch"](3);
          console.log('Error-updateOrder: ', _context53.t0);
          res.status(500).json({
            sucess: false,
            error: _context53.t0
          });
        case 27:
          _context53.prev = 27;
          connection.end();
          return _context53.finish(27);
        case 30:
        case "end":
          return _context53.stop();
      }
    }, _callee53, null, [[3, 23, 27, 30]]);
  }));
  return function getWeekly(_x105, _x106) {
    return _ref53.apply(this, arguments);
  };
}();

//! Sales
var postNewSale = exports.postNewSale = /*#__PURE__*/function () {
  var _ref54 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee54(req, res) {
    var connection, _yield$connection$que123, _yield$connection$que124, consecutivo, _yield$connection$que125, _yield$connection$que126, HeaderSale, EntranseList, EntranseListValues;
    return _regeneratorRuntime().wrap(function _callee54$(_context54) {
      while (1) switch (_context54.prev = _context54.next) {
        case 0:
          _context54.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context54.sent;
          _context54.prev = 3;
          _context54.next = 6;
          return connection.beginTransaction();
        case 6:
          _context54.next = 8;
          return connection.query("SELECT\n                                                            MAX(NDePedido)+1 As Con\n                                                        FROM\n                                                            tabladeestados");
        case 8:
          _yield$connection$que123 = _context54.sent;
          _yield$connection$que124 = _slicedToArray(_yield$connection$que123, 1);
          consecutivo = _yield$connection$que124[0];
          _context54.next = 13;
          return connection.query("\n            INSERT INTO tabladeestados VALUES (\n                ?,\n                ?,\n                ?,\n                ?,\n                'Ingresado',\n                ?,\n                ?,\n                '',\n                ?,\n                ?,\n                ?,\n                0,\n                ?,\n                '',\n                '0')\n            ", [consecutivo[0].Con, req.body.CodCliente, req.body.FechaFactura, req.body.TPago, req.body.FechaFactura, req.body.FEntrega, req.body.CodColaborador, req.body.Iva ? 1 : 0, req.body.FVencimiento, req.body.Nota]);
        case 13:
          _yield$connection$que125 = _context54.sent;
          _yield$connection$que126 = _slicedToArray(_yield$connection$que125, 1);
          HeaderSale = _yield$connection$que126[0];
          if (!(req.body.List.length > 0)) {
            _context54.next = 21;
            break;
          }
          EntranseList = "\n            INSERT INTO\n                    tabladeingresados (\n                                NDePedido,\n                                Cantidad,\n                                Codigo,\n                                VrUnitario,\n                                Costo,\n                                Porcentaje,\n                                APartirDe\n                            )\n                VALUES ".concat(req.body.List.map(function () {
            return '(?,?,?,?,?,?,?)';
          }).join(', '), "\n            ");
          EntranseListValues = req.body.List.flatMap(function (product) {
            return [consecutivo[0].Con, product.Cantidad, product.Codigo, product.VrUnitario, product.Costo, product.Porcentaje, product.ApartirDe];
          });
          _context54.next = 21;
          return connection.execute(EntranseList, EntranseListValues);
        case 21:
          _context54.next = 23;
          return connection.commit();
        case 23:
          // GUARDA TODO SI NADA FALLÓ
          res.status(200).json({
            sucess: true,
            error: consecutivo[0].Con
          });
          _context54.next = 32;
          break;
        case 26:
          _context54.prev = 26;
          _context54.t0 = _context54["catch"](3);
          _context54.next = 30;
          return connection.rollback();
        case 30:
          //DESHACE TODO LO QUE SE INSERTÓ
          console.log('Error-postNewSale: ', _context54.t0);
          res.status(500).json({
            sucess: false,
            error: _context54.t0.message
          });
        case 32:
          _context54.prev = 32;
          connection.end();
          return _context54.finish(32);
        case 35:
        case "end":
          return _context54.stop();
      }
    }, _callee54, null, [[3, 26, 32, 35]]);
  }));
  return function postNewSale(_x107, _x108) {
    return _ref54.apply(this, arguments);
  };
}();
var postAllowed = exports.postAllowed = /*#__PURE__*/function () {
  var _ref55 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee55(req, res) {
    var connection, _yield$connection$que127, _yield$connection$que128, consecutivo;
    return _regeneratorRuntime().wrap(function _callee55$(_context55) {
      while (1) switch (_context55.prev = _context55.next) {
        case 0:
          _context55.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context55.sent;
          _context55.prev = 3;
          //Introduce the data into the table salidas
          console.log(req.body);
          _context55.next = 7;
          return connection.query("SELECT\n                                                        CASE\n                                                            WHEN EXISTS (\n                                                                SELECT 1\n                                                                FROM PermisosUsuarios AS p\n                                                                WHERE p.IdUsuario = ? AND p.PermisoId = ?\n                                                            ) THEN 1\n                                                            ELSE 0\n                                                        END AS TienePermiso;", [req.body.UserID, req.body.PermisoId]);
        case 7:
          _yield$connection$que127 = _context55.sent;
          _yield$connection$que128 = _slicedToArray(_yield$connection$que127, 1);
          consecutivo = _yield$connection$que128[0];
          res.status(200).json({
            sucess: true,
            error: consecutivo[0].TienePermiso
          });
          _context55.next = 17;
          break;
        case 13:
          _context55.prev = 13;
          _context55.t0 = _context55["catch"](3);
          console.log('Error-postAllowed: ', _context55.t0);
          res.status(500).json({
            sucess: false,
            error: JSON.stringify(_context55.t0)
          });
        case 17:
          _context55.prev = 17;
          connection.end();
          return _context55.finish(17);
        case 20:
        case "end":
          return _context55.stop();
      }
    }, _callee55, null, [[3, 13, 17, 20]]);
  }));
  return function postAllowed(_x109, _x110) {
    return _ref55.apply(this, arguments);
  };
}();
var postAllowedList = exports.postAllowedList = /*#__PURE__*/function () {
  var _ref56 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee56(req, res) {
    var connection, _yield$connection$que129, _yield$connection$que130, consecutivo;
    return _regeneratorRuntime().wrap(function _callee56$(_context56) {
      while (1) switch (_context56.prev = _context56.next) {
        case 0:
          _context56.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context56.sent;
          _context56.prev = 3;
          console.log(req.body);
          //Introduce the data into the table salidas
          _context56.next = 7;
          return connection.query("SELECT \n                                                        p.Id AS Permiso_id,\n                                                        p.NombrePermiso AS Nombre_del_permiso,\n                                                        CASE WHEN up.PermisoId IS NULL THEN FALSE ELSE TRUE END AS TienePermiso\n                                                    FROM\n                                                        Permisos AS p\n                                                    LEFT JOIN\n                                                        PermisosUsuarios AS up \n                                                        ON p.Id = up.PermisoId AND up.IdUsuario = ?", [req.body.UserID]);
        case 7:
          _yield$connection$que129 = _context56.sent;
          _yield$connection$que130 = _slicedToArray(_yield$connection$que129, 1);
          consecutivo = _yield$connection$que130[0];
          res.status(200).json(consecutivo);
          _context56.next = 17;
          break;
        case 13:
          _context56.prev = 13;
          _context56.t0 = _context56["catch"](3);
          console.log('Error-postAllowedList: ', _context56.t0);
          res.status(500).json({
            sucess: false,
            error: JSON.stringify(_context56.t0)
          });
        case 17:
          _context56.prev = 17;
          connection.end();
          return _context56.finish(17);
        case 20:
        case "end":
          return _context56.stop();
      }
    }, _callee56, null, [[3, 13, 17, 20]]);
  }));
  return function postAllowedList(_x111, _x112) {
    return _ref56.apply(this, arguments);
  };
}();
var postChangePassword = exports.postChangePassword = /*#__PURE__*/function () {
  var _ref57 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee57(req, res) {
    var connection, plainPassword, hashedPassword, _yield$connection$que131, _yield$connection$que132, upRows;
    return _regeneratorRuntime().wrap(function _callee57$(_context57) {
      while (1) switch (_context57.prev = _context57.next) {
        case 0:
          _context57.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context57.sent;
          _context57.prev = 3;
          // To hash the new password
          plainPassword = req.body.NewPassword;
          _context57.next = 7;
          return new Promise(function (resolve, reject) {
            bcrypt.hash(plainPassword, 10, function (err, hashedPassword) {
              if (err) {
                reject(err);
              } else {
                resolve(hashedPassword);
              }
            });
          });
        case 7:
          hashedPassword = _context57.sent;
          _context57.next = 10;
          return connection.query("UPDATE colaboradores SET Contraseña = ? WHERE Cod =  ?", [hashedPassword, req.body.CodUser]);
        case 10:
          _yield$connection$que131 = _context57.sent;
          _yield$connection$que132 = _slicedToArray(_yield$connection$que131, 1);
          upRows = _yield$connection$que132[0];
          //res.json(upRows);
          res.status(200).json({
            sucess: true,
            error: ''
          });
          _context57.next = 20;
          break;
        case 16:
          _context57.prev = 16;
          _context57.t0 = _context57["catch"](3);
          console.log('Error-postChangePassword: ', _context57.t0);
          res.status(500).json({
            sucess: false,
            error: JSON.stringify(_context57.t0)
          });
        case 20:
          _context57.prev = 20;
          connection.end();
          return _context57.finish(20);
        case 23:
        case "end":
          return _context57.stop();
      }
    }, _callee57, null, [[3, 16, 20, 23]]);
  }));
  return function postChangePassword(_x113, _x114) {
    return _ref57.apply(this, arguments);
  };
}();
var postChangePermits = exports.postChangePermits = /*#__PURE__*/function () {
  var _ref58 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee58(req, res) {
    var connection, _yield$connection$que133, _yield$connection$que134, consecutivo, ingresoQuery, PermitValues;
    return _regeneratorRuntime().wrap(function _callee58$(_context58) {
      while (1) switch (_context58.prev = _context58.next) {
        case 0:
          _context58.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context58.sent;
          _context58.prev = 3;
          _context58.next = 6;
          return connection.query("DELETE FROM PermisosUsuarios WHERE IdUsuario = ?;", [req.body.IdUsuario]);
        case 6:
          _yield$connection$que133 = _context58.sent;
          _yield$connection$que134 = _slicedToArray(_yield$connection$que133, 1);
          consecutivo = _yield$connection$que134[0];
          if (!(req.body.permList.length > 0)) {
            _context58.next = 14;
            break;
          }
          ingresoQuery = "\n            INSERT INTO\n                PermisosUsuarios (\n                            IdUsuario,\n                            PermisoId\n                        )\n            VALUES ".concat(req.body.permList.map(function () {
            return '(?,?)';
          }).join(', '), "\n            ");
          PermitValues = req.body.permList.flatMap(function (product) {
            return [product.IdUsuario, product.PermisoId];
          });
          _context58.next = 14;
          return connection.execute(ingresoQuery, PermitValues);
        case 14:
          res.status(200).json({
            sucess: true,
            error: ''
          });
          _context58.next = 21;
          break;
        case 17:
          _context58.prev = 17;
          _context58.t0 = _context58["catch"](3);
          console.log('Error-postAllowedList: ', _context58.t0);
          res.status(500).json({
            sucess: false,
            error: JSON.stringify(_context58.t0)
          });
        case 21:
          _context58.prev = 21;
          connection.end();
          return _context58.finish(21);
        case 24:
        case "end":
          return _context58.stop();
      }
    }, _callee58, null, [[3, 17, 21, 24]]);
  }));
  return function postChangePermits(_x115, _x116) {
    return _ref58.apply(this, arguments);
  };
}();
var postNewWorker = exports.postNewWorker = /*#__PURE__*/function () {
  var _ref59 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee59(req, res) {
    var connection, plainPassword, hashedPassword, _yield$connection$que135, _yield$connection$que136, consecutivo, _yield$connection$que137, _yield$connection$que138, NColaborador, permits, values;
    return _regeneratorRuntime().wrap(function _callee59$(_context59) {
      while (1) switch (_context59.prev = _context59.next) {
        case 0:
          _context59.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context59.sent;
          _context59.prev = 3;
          //Introduce the data into the table salidas
          plainPassword = req.body.Contraseña;
          _context59.next = 7;
          return new Promise(function (resolve, reject) {
            bcrypt.hash(plainPassword, 10, function (err, hashedPassword) {
              if (err) {
                reject(err);
              } else {
                resolve(hashedPassword);
              }
            });
          });
        case 7:
          hashedPassword = _context59.sent;
          _context59.next = 10;
          return connection.query("INSERT INTO\n            colaboradores (\n                        Nombre,\n                        Apellido,\n                        Cargo,\n                        Telefono,\n                        Cel,\n                        Email,\n                        Direccion,\n                        Nota,\n                        Contrase\xF1a,\n                        Usuario,\n                        Activo\n                    )\n        VALUES (?,?,?,?,?,?,?,?,?,?,?)", [req.body.Nombre, req.body.Apellido, req.body.Cargo, req.body.Telefono, req.body.Cel, req.body.Email, req.body.Direccion, req.body.Nota, hashedPassword, req.body.Usuario, 1]);
        case 10:
          _yield$connection$que135 = _context59.sent;
          _yield$connection$que136 = _slicedToArray(_yield$connection$que135, 1);
          consecutivo = _yield$connection$que136[0];
          _context59.next = 15;
          return connection.query("SELECT\n                                                            MAX(Cod) AS Con\n                                                        FROM\n                                                            colaboradores");
        case 15:
          _yield$connection$que137 = _context59.sent;
          _yield$connection$que138 = _slicedToArray(_yield$connection$que137, 1);
          NColaborador = _yield$connection$que138[0];
          permits = "INSERT INTO\n                            PermisosUsuarios (\n                                        IdUsuario,\n                                        PermisoId\n                                    )\n                        VALUES ".concat(req.body.permit.map(function () {
            return '(?,?)';
          }).join(', '), "\n                        ");
          values = req.body.permit.flatMap(function (item) {
            return [NColaborador[0].Con, item];
          });
          _context59.next = 22;
          return connection.execute(permits, values);
        case 22:
          res.status(200).json({
            sucess: true,
            error: ''
          });
          _context59.next = 29;
          break;
        case 25:
          _context59.prev = 25;
          _context59.t0 = _context59["catch"](3);
          console.log('Error-postNewWorker: ', _context59.t0);
          res.status(500).json({
            sucess: false,
            error: _context59.t0
          });
        case 29:
          _context59.prev = 29;
          connection.end();
          return _context59.finish(29);
        case 32:
        case "end":
          return _context59.stop();
      }
    }, _callee59, null, [[3, 25, 29, 32]]);
  }));
  return function postNewWorker(_x117, _x118) {
    return _ref59.apply(this, arguments);
  };
}();
var postUpdateWorker = exports.postUpdateWorker = /*#__PURE__*/function () {
  var _ref60 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee60(req, res) {
    var connection, _yield$connection$que139, _yield$connection$que140, consecutivo;
    return _regeneratorRuntime().wrap(function _callee60$(_context60) {
      while (1) switch (_context60.prev = _context60.next) {
        case 0:
          _context60.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context60.sent;
          _context60.prev = 3;
          _context60.next = 6;
          return connection.query("UPDATE colaboradores\n                                                        SET \n                                                            Nombre = ?,\n                                                            Apellido = ?,\n                                                            Cargo = ?,\n                                                            Telefono = ?,\n                                                            Cel = ?,\n                                                            Email = ?,\n                                                            Direccion = ?,\n                                                            Nota = ?,\n                                                            Usuario = ?\n                                                    WHERE Cod = ?", [req.body.Nombre, req.body.Apellido, req.body.Cargo, req.body.Telefono, req.body.Cel, req.body.Email, req.body.Direccion, req.body.Nota, req.body.Usuario, req.body.Cod]);
        case 6:
          _yield$connection$que139 = _context60.sent;
          _yield$connection$que140 = _slicedToArray(_yield$connection$que139, 1);
          consecutivo = _yield$connection$que140[0];
          res.status(200).json({
            sucess: true,
            error: ''
          });
          _context60.next = 16;
          break;
        case 12:
          _context60.prev = 12;
          _context60.t0 = _context60["catch"](3);
          console.log('Error-postUpdateWorker: ', _context60.t0);
          res.status(500).json({
            sucess: false,
            error: _context60.t0
          });
        case 16:
          _context60.prev = 16;
          connection.end();
          return _context60.finish(16);
        case 19:
        case "end":
          return _context60.stop();
      }
    }, _callee60, null, [[3, 12, 16, 19]]);
  }));
  return function postUpdateWorker(_x119, _x120) {
    return _ref60.apply(this, arguments);
  };
}();