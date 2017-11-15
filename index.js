module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = set;
function set(props) {
  for (var k in props) {
    this[k] = props[k];
  }
  return this;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = clear;
function clear() {
  for (var k in this) {
    if (this.hasOwnProperty(k)) {
      this[k] = undefined;
    }
  }
  return this;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _URL = __webpack_require__(3);

var _URL2 = _interopRequireDefault(_URL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _URL2.default;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Origin = __webpack_require__(4);
var Search = __webpack_require__(5);
var Parameters = __webpack_require__(6);

var URL = function () {
  function URL(a, b) {
    _classCallCheck(this, URL);

    var params = typeof a === "string" ? a : undefined;

    var loc = (typeof a === "undefined" ? "undefined" : _typeof(a)) === "object" ? a : typeof b === "string" ? { href: b } : b;

    this.location = {
      origin: this.getUrlOrigin(params, loc),
      href: this.getUrlHref(params, loc),
      pathname: this.getUrlPathname(params, loc),
      params: this.getUrlPathname(params || this.getLocationString(loc)),
      search: this.getUrlSearch(params, loc),
      searchSchema: this.getUrlSearch(params)
    };

    this.origin = new Origin(this.location);
    this.search = new Search(this.location);
    this.params = new Parameters(this.location);
    this.isMatch = this.params.__isMatch;
  }

  _createClass(URL, [{
    key: "getLocationString",
    value: function getLocationString(loc) {
      return loc && (loc.href || loc.pathname || loc.origin);
    }
  }, {
    key: "getUrlHref",
    value: function getUrlHref(params, loc) {
      if ((typeof loc === "undefined" ? "undefined" : _typeof(loc)) === "object") {
        return loc.href || loc.origin;
      } else if (params) {
        return params;
      }
    }
  }, {
    key: "getUrlPathname",
    value: function getUrlPathname(params, loc) {
      var string = params ? params.split("?")[0] : "";
      var start = 0;
      var end = string.length;

      if ((typeof loc === "undefined" ? "undefined" : _typeof(loc)) === "object") {
        return this.getUrlPathname(this.getLocationString(loc));
      } else if (string) {
        if (string.indexOf("http://") === 0) {
          start += 7;
        } else if (string.indexOf("https://") === 0) {
          start += 8;
        }
        start = string.indexOf("/", start);
      }

      return start === -1 ? "/" : string.substring(start, end);
    }
  }, {
    key: "getUrlOrigin",
    value: function getUrlOrigin(params, loc) {
      var origin = undefined;
      var end = void 0;

      if ((typeof loc === "undefined" ? "undefined" : _typeof(loc)) === "object") {
        return this.getUrlOrigin(loc.origin || loc.href || loc.pathname);
      } else if (params && params.indexOf("http") === 0) {
        params = params.split("?")[0];
        end = params.indexOf("/", params.indexOf("//") + 2);
        origin = params.substring(0, end > -1 ? end : params.length);
      }

      return origin;
    }
  }, {
    key: "getUrlSearch",
    value: function getUrlSearch(params, loc) {
      if ((typeof loc === "undefined" ? "undefined" : _typeof(loc)) === "object") {
        return loc.search ? loc.search : this.getUrlSearch(loc.href);
      } else if (params) {
        return params.split("?")[1] ? "?" + params.split("?")[1] : "";
      }

      return "";
    }
  }, {
    key: "setSchema",
    value: function setSchema(params) {
      Object.assign(this, new URL(params, {
        pathname: this.__pathname,
        search: this.__search
      }));
      return this;
    }
  }, {
    key: "locationFromString",
    value: function locationFromString(string) {
      var split = string.split("?");
      return {
        pathname: split[0],
        search: split[1] || ""
      };
    }
  }, {
    key: "toObject",
    value: function toObject(string) {
      return new URL(this.__params, this.locationFromString(string));
    }
  }, {
    key: "copy",
    value: function copy() {
      var x = new URL(this.__params, {
        pathname: this.__pathname,
        search: this.__search,
        origin: this.__origin
      });

      for (var k in this.search) {
        if (this.search.hasOwnProperty(k)) {
          x.search[k] = this.search[k];
        }
      }

      for (k in this.params) {
        if (this.params.hasOwnProperty(k)) {
          x.params[k] = this.params[k];
        }
      }

      return x;
    }
  }, {
    key: "set",
    value: function set(location) {
      var x = {};

      var keys = ["pathname", "href", "origin", "search"];

      for (var i = 0, n = keys.length; i < n; i++) {
        if (location[keys[i]]) {
          x[keys[i]] = location[keys[i]];
          this.location[keys[i]] = location[keys[i]];
        }
      }

      if (x.pathname || x.href) {
        this.location.params = this.getUrlPathname(this.getLocationString(x));
      }

      this.origin = new Origin(this.location);
      this.search = new Search(this.location);
      this.params = new Parameters(this.location);
      this.isMatch = this.params.__isMatch;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.origin.toString() + this.params.toString() + this.search.toString();
    }
  }]);

  return URL;
}();

exports.default = URL;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Origin(location) {
  this.value = location.origin;
}

Origin.prototype.toString = function () {
  return this.value ? this.value : "";
};

module.exports = Origin;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var set = __webpack_require__(0);
var clear = __webpack_require__(1);

function valueByType(str) {
  var n = Number(str);
  return isNaN(n) ? str : n;
}

function Search(location) {
  this.getSchema(location.searchSchema);
  this.fromString(location.search);
}

function getType(element, type) {
  var res = {
    delimiter: element && element.indexOf(",") > -1 ? "," : "+",
    type: type,
    map: []
  };

  if (element) {
    element.split(res.delimiter).forEach(function (name) {
      if (name[0] === ":") {
        res.map.push(name.substring(1));
      } else {
        res.map.push({ constant: name });
      }
    });
  }

  return res;
}

Search.prototype.getSchema = function (searchSchema) {
  var split = (searchSchema[0] === "?" ? searchSchema.slice(1) : searchSchema).split("&");

  var isArray = false;
  var element = void 0;

  this.__schema = {};
  this.__schemaKeys = [];

  for (var i = 0, n = split.length; i < n; i++) {
    if (split[i].length) {
      element = split[i].split("=");
      isArray = element[0].slice(-2) === "[]";

      element[0] = isArray ? element[0].slice(0, -2) : element[0];

      this.__schemaKeys.push(element[0]);
      this.__schema[element[0]] = getType(element[1], isArray ? "array" : "object");
    }
  }
};

Search.prototype.fromString = function (search) {
  var list = search && search.length ? search.replace(/^\?/, "").split("&") : [];

  var t = {};

  for (var _i = 0, _n = list.length; _i < _n; _i++) {
    list[_i] = list[_i].split("=").map(decodeURI);
    t.isArray = list[_i][0].slice(-2) === "[]";
    list[_i][1] = list[_i][1] || 1;

    if (t.isArray) {
      list[_i][0] = list[_i][0].slice(0, -2);
      this[list[_i][0]] = this[list[_i][0]] || [];
    }

    t.schema = this.__schema[list[_i][0]];
    t.isSchema = t.schema && t.schema.map.length;

    if (t.isSchema) {
      t.split = list[_i][1].split(t.schema.delimiter);
      t.value = {};

      for (var x = 0, y = t.split.length; x < y; x++) {
        t.key = t.schema.map[x];
        if (t.key) {
          if (t.key.constant) {
            t.value[t.key.constant] = t.key.constant;
          } else {
            t.value[t.key] = valueByType(t.split[x]);
          }
        } else {
          t.value.__invalid = true;
        }
      }

      if (t.schema.type === "array") {
        this[list[_i][0]].push(t.value);
      } else {
        this[list[_i][0]] = t.value;
      }
    } else if (t.isArray) {
      this[list[_i][0]].push(valueByType(list[_i][1]));
    } else {
      this[list[_i][0]] = valueByType(list[_i][1]);
    }
  }

  for (var i = 0, n = this.__schemaKeys.length; i < n; i++) {
    if (typeof this[this.__schemaKeys[i]] === "undefined") {
      if (this.__schema[this.__schemaKeys[i]].type === "array") {
        this[this.__schemaKeys[i]] = [];
      } else if (this.__schema[this.__schemaKeys[i]].type === "object") {
        this[this.__schemaKeys[i]] = {};
      }
    }
  }
};

function schemaArrayToString(key, value, schema) {
  var t = [];

  for (var i = 0, n = value.length; i < n; i++) {
    t.push([encodeURI(key) + "[]="]);

    for (var x in value[i]) {
      t[i].push(value[i][x]);
    }

    t[i] = t[i][0] + encodeURI(t[i].slice(1).join(schema.delimiter));
  }

  return t.join("&");
}

function schemaObjectToString(key, value, schema) {
  var temp = [key + "=", []];

  value = value || {};

  for (var i = 0, n = schema.map.length; i < n; i++) {
    if (schema.map[i].constant) {
      temp[1].push(schema.map[i].constant);
    } else if (value[schema.map[i]]) {
      temp[1].push(value[schema.map[i]]);
    }
  }

  return encodeURI(temp[0] + temp[1].join("+"));
}

Search.prototype.toString = function () {
  var search = [];

  for (var k in this) {
    if (this.hasOwnProperty(k) && k.substring(0, 2) !== "__") {
      if (this.__schema[k] && this.__schema[k].map.length) {
        if (this.__schema[k].type === "array") {
          search.push(schemaArrayToString(k, this[k], this.__schema[k]));
        } else if (this.__schema[k].type === "object") {
          search.push(schemaObjectToString(k, this[k], this.__schema[k]));
        }
      } else if (typeof this[k] === "number" || typeof this[k] === "string" && this[k].length) {
        search.push(encodeURI(k + "=" + this[k]));
      } else if (Array.isArray(this[k])) {
        for (var i = 0, n = this[k].length; i < n; i++) {
          search.push(encodeURI(k) + "[]=" + encodeURI(this[k][i]));
        }
      }
    }
  }

  return search.length ? "?" + search.join("&") : "";
};

Search.prototype.set = function (opt) {
  for (var k in opt) {
    if (opt.hasOwnProperty(k)) {
      this[typeof this[k] === "function" ? "_" + k : k] = opt[k];
    }
  }
  return this;
};

Search.prototype.get = function (key) {
  var props = {};
  if ((typeof key === "undefined" ? "undefined" : _typeof(key)) === "object") {
    for (var i = 0, n = key.length; i < n; i++) {
      props[key[i]] = this.get(key[i]);
    }
    return props;
  }
  return this[typeof this[key] === "function" ? "_" + key : key];
};

Search.prototype.clear = clear;

module.exports = Search;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var set = __webpack_require__(0);
var clear = __webpack_require__(1);

function pathnameToArray(pathname) {
  if (pathname[0] === "/") {
    pathname = pathname.substring(1);
  }

  if (pathname.slice(-1) === "/") {
    pathname = pathname.slice(0, -1);
  }

  return pathname.length ? pathname.split("/") : [];
}

function Parameters(location) {
  this.__path = pathnameToArray(location.pathname);
  this.__params = pathnameToArray(location.params);
  this.__isMatch = this.__params.length === 0 || this.__path.length === this.__params.length;

  if (this.__params.length === 1 && this.__params[0] === "*") {
    this.__params = this.__path.slice();
  }

  for (var i = 0, n = this.__params.length; i < n; i++) {
    if (!this.__path[i] || this.__params[i][0] !== ":" && this.__params[i] !== "*" && this.__params[i] !== this.__path[i]) {
      this.__isMatch = false;
    }

    if (this.__params[i][0] === ":") {
      if (typeof this[this.__params[i].slice(1)] === "function") {
        throw new Error("Invalid parameter name: \"" + this.__params[i].slice(1) + "\", this is a reserved word.");
      }
      this[this.__params[i].slice(1)] = this.__path[i];
    }
  }
}

Parameters.prototype.push = function (value) {
  if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === "object") {
    for (var k in value) {
      if (typeof this[k] === "function") {
        throw new Error("Invalid parameter name: \"" + k + "\", this is a reserved word.");
      }
      this[k] = value[k];
      this.__params.push(value[k]);
    }
  } else {
    this.__params.push(value);
  }

  return this;
};

Parameters.prototype.startsWith = function (value) {
  var str = this.toString();
  var path = "/" + pathnameToArray(value).join("/");
  var n = path.length - 1;
  return str.indexOf(path) === 0 && (str[n] === "/" || !str[n]);
};

Parameters.prototype.is = function (value) {
  return this.toString() === "/" + pathnameToArray(value).join("/");
};

Parameters.prototype.toString = function () {
  var length = this.__params.length;
  var query = new Array(length);

  for (var i = 0; i < length; i++) {
    query[i] = this.__params[i][0] === ":" ? this[this.__params[i].slice(1)] : this.__params[i];
  }

  return "/" + query.join("/");
};

Parameters.prototype.set = set;
Parameters.prototype.clear = clear;
module.exports = Parameters;

/***/ })
/******/ ]);