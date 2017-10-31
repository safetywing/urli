const set   = require("./set");
const clear = require("./clear");

function Parameters(location) {
  this.__path    = location.pathname.split("/").filter(a => a.length);
  this.__params  = location.params.split("/").filter(a => a.length);
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
      if (typeof this[this.__params[i].slice(1)] === "function") {
        throw new Error(
          "Invalid parameter name: \"" + this.__params[i].slice(1) + "\", this is a reserved word."
        );
      }
      this[this.__params[i].slice(1)] = this.__path[i];
    }
  }
}

Parameters.prototype.startsWith = function (value) {
  const each = (value[0] === "/" ? value.substring(1) : value).split("/");
  let startsWith = true;
  for (var i = 0, n = each.length; i < n; i++) {
    if (this.__path[i] !== each[i]) {
      startsWith = false;
    }
  }
  return startsWith;
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