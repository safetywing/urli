const Origin     = require("./Origin");
const Search     = require("./Search");
const Parameters = require("./Parameters");

module.exports = class URL {
  constructor(a, b) {
    const params   = (
      typeof a === "string"
        ? a
        : undefined
    );

    const loc      = (
      typeof a === "object"
        ? a
        : typeof b === "string"
          ? { href: b }
          : b
    );

    const location = {
      origin       : this.getUrlOrigin(params, loc),
      href         : this.getUrlHref(params, loc),
      pathname     : this.getUrlPathname(params, loc),
      params       : this.getUrlPathname(params || this.getLocationString(loc)),
      search       : this.getUrlSearch(params, loc),
      searchSchema : this.getUrlSearch(params)
    };

    this.origin   = new Origin(location);
    this.search   = new Search(location);
    this.params   = new Parameters(location);
    this.isMatch  = this.params.__isMatch;
  }

  getLocationString(loc) {
    return loc && (loc.href || loc.pathname || loc.origin);
  }

  getUrlHref(params, loc) {
    if (typeof loc === "object") {
      return loc.href;
    } else if (params) {
      return params;
    }
  }

  getUrlPathname(params, loc) {
    let string = params ? params.split("?")[0] : "";
    let start  = 0;
    let end    = string.length;

    if (typeof loc === "object") {
      return this.getUrlPathname(
        this.getLocationString(loc)
      );
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

  getUrlOrigin(params, loc) {
    let origin = false;
    let end;

    if (typeof loc === "object") {
      return this.getUrlOrigin(loc.origin || loc.href || loc.pathname);
    } else if (params && params.indexOf("http") === 0) {
      params = params.split("?")[0];
      end    = params.indexOf("/", params.indexOf("//") + 2);
      origin = params.substring(0, end > -1 ? end : params.length);
    }

    return origin;
  }

  getUrlSearch(params, loc) {
    if (typeof loc === "object") {
      return loc.search ? loc.search : this.getUrlSearch(loc.href);
    } else if (params) {
      return params.split("?")[1] ? "?" + params.split("?")[1] : "";
    }

    return "";
  }

  setSchema(params) {
    Object.assign(this, new URL(params, {
      pathname: this.__pathname,
      search  : this.__search
    }));
    return this;
  }

  locationFromString(string) {
    const split = string.split("?");
    return {
      pathname: split[0],
      search  : split[1] || ""
    };
  }

  toObject(string) {
    return new URL(
      this.__params,
      this.locationFromString(string)
    );
  }

  copy() {
    let x = new URL(this.__params, {
      pathname : this.__pathname,
      search   : this.__search,
      origin   : this.__origin
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

  toString() {
    return (
      this.origin.toString() +
      this.params.toString() +
      this.search.toString()
    );
  }
};