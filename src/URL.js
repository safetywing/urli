const Origin     = require("./Origin");
const Search     = require("./Search");
const Parameters = require("./Parameters");
const Hash       = require("./Hash");

class URL {
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

    this.location = {
      origin       : this.getUrlOrigin(params, loc),
      href         : this.getUrlHref(params, loc),
      pathname     : this.getUrlPathname(params, loc),
      hash         : this.getUrlHash(params, loc),
      params       : this.getUrlPathname(params || this.getLocationString(loc)),
      search       : this.getUrlSearch(params, loc),
      searchSchema : this.getUrlSearch(params)
    };

    this.origin  = new Origin(this.location);
    this.search  = new Search(this.location);
    this.params  = new Parameters(this.location);
    this.hash    = new Hash(this.location);
    this.isMatch = this.params.__isMatch;
  }

  getLocationString(loc) {
    return loc && (loc.href || loc.pathname || loc.origin);
  }

  getUrlHash(params, loc) {
    let split = params && params.split("#")[1];
    let hash  = split ? "#" + split : "";
    let isLoc = typeof loc === "object";

    if (hash && (isLoc && !loc.hash || !isLoc)) {
      return hash;
    }

    if (isLoc) {
      return loc.hash
        ? loc.hash
        : loc.href
          ? this.getUrlHash(loc.href)
          : "";
    }

    return "";
  }

  getUrlHref(params, loc) {
    if (typeof loc === "object") {
      return loc.href || loc.origin;
    } else if (params) {
      return params;
    }
  }

  getUrlPathname(params, loc) {
    let string = params ? params.split("?")[0].split("#")[0] : "";
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
    let origin = undefined;
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
    return {
      pathname : this.getUrlPathname(string),
      hash     : this.getHash(string),
      search   : this.getUrlSearch(string)
    };
  }

  toObject(string) {
    return new URL(
      this.__params,
      this.locationFromString(string)
    );
  }

  copy() {
    let x = new URL(this.__params, this.location);

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

    for (k in this.hash) {
      if (this.hash.hasOwnProperty(k)) {
        x.hash[k] = this.hash[k];
      }
    }

    return x;
  }

  set(location) {
    const x = {};

    const keys = [
      "pathname",
      "href",
      "hash",
      "origin",
      "search"
    ];

    for (var i = 0, n = keys.length; i < n; i++) {
      if (location[keys[i]]) {
        x[keys[i]]             = location[keys[i]];
        this.location[keys[i]] = location[keys[i]];
      }
    }

    if (x.pathname || x.href) {
      this.location.params = (
        this.getUrlPathname(
          this.getLocationString(x)
        )
      );
    }

    this.origin  = new Origin(this.location);
    this.search  = new Search(this.location);
    this.params  = new Parameters(this.location);
    this.hash    = new Hash(this.location);
    this.isMatch = this.params.__isMatch;
  }

  toString() {
    return (
      this.origin.toString() +
      this.params.toString() +
      this.search.toString() +
      this.hash.toString()
    );
  }
}

export default URL;