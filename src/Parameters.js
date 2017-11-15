const set   = require("./set");
const clear = require("./clear");

function pathnameToArray(pathname) {
  if (pathname[0] === "/") {
    pathname = pathname.substring(1);
  }

  if (pathname.slice(-1) === "/") {
    pathname = pathname.slice(0, -1);
  }

  return pathname.length ? pathname.split("/") : [];
}

function maybeError(self, key) {
  if (typeof self[key] === "function") {
    throw new Error(
      "Invalid parameter name: \"" + key + "\", this is a reserved word."
    );
  }
}

function Parameters(location) {
  this.__path    = pathnameToArray(location.pathname);
  this.__params  = pathnameToArray(location.params);
  this.__isMatch = this.__params.length === 0 || this.__path.length === this.__params.length;

  if (this.__params.length === 1 && this.__params[0] === "*") {
    this.__params = this.__path.slice();
  }

  for (let i = 0, n = this.__params.length; i < n; i++) {
    if (
      !this.__path[i] ||
      (this.__params[i][0] !== ":" &&
       this.__params[i] !== "*" &&
       this.__params[i] !== this.__path[i])
    ) {
      this.__isMatch = false;
    }

    if (this.__params[i][0] === ":") {
      maybeError(this, this.__params[i].slice(1));
      this[this.__params[i].slice(1)] = this.__path[i];
    }
  }
}

Parameters.prototype.push = function (value) {
  if (typeof value === "object") {
    for (var k in value) {
      maybeError(this, k);
      this[k] = value[k];
      this.__params.push(value[k]);
    }
  } else {
    this.__params.push(value);
  }

  return this;
};

Parameters.prototype.unshift = function (value) {
  if (typeof value === "object") {
    for (var k in value) {
      maybeError(this, k);
      this[k] = value[k];
      this.__params.unshift(value[k]);
    }
  } else {
    this.__params.unshift(value);
  }

  return this;
};

Parameters.prototype.startsWith = function (value) {
  const str  = this.toString();
  const path = "/" + pathnameToArray(value).join("/");
  const n    = path.length - 1;
  return str.indexOf(path) === 0 && (str[n] === "/" || !str[n]);
};

Parameters.prototype.is = function (value) {
  return this.toString() === "/" + pathnameToArray(value).join("/");
};

Parameters.prototype.toString = function () {
  const length = this.__params.length;
  const query  = new Array(length);

  for (var i = 0; i < length; i++) {
    query[i] = (
      this.__params[i][0] === ":"
        ? this[this.__params[i].slice(1)]
        : this.__params[i]
    );
  }

  return "/" + query.join("/");
};

Parameters.prototype.set   = set;
Parameters.prototype.clear = clear;
module.exports = Parameters;