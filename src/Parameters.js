const set   = require("./set");
const clear = require("./clear");

function pathnameToArray(pathname) {
  if (pathname[0] === "/") {
    pathname = pathname.substring(1);
  }

  if (pathname[pathname.length - 1] === "/") {
    pathname = pathname.substring(0, pathname.length - 1);
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
  this.path    = pathnameToArray(location.pathname);
  this.params  = pathnameToArray(location.params);
  this.isMatch = this.params.length === 0 || this.path.length === this.params.length;

  if (this.params.length === 1 && this.params[0] === "*") {
    this.params = this.path.slice();
  }

  for (let i = 0, n = this.params.length; i < n; i++) {
    if (
      !this.path[i] ||
      (this.params[i][0] !== ":" &&
       this.params[i] !== "*" &&
       this.params[i] !== this.path[i])
    ) {
      this.isMatch = false;
    }

    if (this.params[i][0] === ":") {
      maybeError(this, this.params[i].slice(1));
      this[this.params[i].slice(1)] = this.path[i];
    }
  }
}

Parameters.prototype.push = function (value) {
  if (typeof value === "object") {
    for (var k in value) {
      maybeError(this, k);
      this[k] = value[k];
      this.params.push(value[k]);
    }
  } else {
    this.params.push(value);
  }

  return this;
};

Parameters.prototype.unshift = function (value) {
  if (typeof value === "object") {
    for (var k in value) {
      maybeError(this, k);
      this[k] = value[k];
      this.params.unshift(value[k]);
    }
  } else {
    this.params.unshift(value);
  }

  return this;
};

Parameters.prototype.startsWith = function (value) {
  const str  = this.toString();
  const path = "/" + pathnameToArray(value).join("/");
  const n    = path.length;
  return str.indexOf(path) === 0 && (str[n] === "/" || !str[n + 1]);
};

Parameters.prototype.is = function (value) {
  return this.toString() === "/" + pathnameToArray(value).join("/");
};

Parameters.prototype.toString = function () {
  const length = this.params.length;
  const query  = new Array(length);

  for (var i = 0; i < length; i++) {
    query[i] = (
      this.params[i][0] === ":"
        ? this[this.params[i].slice(1)]
        : this.params[i]
    );
  }

  return "/" + query.join("/");
};

Parameters.prototype.set   = set;
Parameters.prototype.clear = clear;
module.exports = Parameters;