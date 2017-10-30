const set   = require("./set");
const clear = require("./clear");

function valueByType(str) {
  let n = Number(str);
  return isNaN(n) ? str : n;
}

function Search(location) {
  this.getSchema(location.searchSchema);
  this.fromString(location.search);
}

function getType(element, type) {
  let res = {
    delimiter : element && element.indexOf(",") > -1 ? "," : "+",
    type      : type,
    map       : []
  };

  if (element) {
    element.split(res.delimiter).forEach(name => {
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
  const split = (
    searchSchema[0] === "?"
      ? searchSchema.slice(1)
      : searchSchema
  ).split("&");

  let isArray = false;
  let element;

  this.__schema = {};
  this.__schemaKeys = [];

  for (var i = 0, n = split.length; i < n; i++) {
    if (split[i].length) {
      element = split[i].split("=");
      isArray = element[0].slice(-2) === "[]";

      element[0] = isArray
        ? element[0].slice(0, -2)
        : element[0];

      this.__schemaKeys.push(element[0]);
      this.__schema[element[0]] = (
        getType(element[1], isArray
          ? "array"
          : "object"
        )
      );
    }
  }
};

Search.prototype.fromString = function (search) {
  const list = search && search.length
    ? search.replace(/^\?/, "").split("&")
    : [];

  let t = {};

  for (let i = 0, n = list.length; i < n; i++) {
    list[i]    = list[i].split("=").map(decodeURI);
    t.isArray  = list[i][0].slice(-2) === "[]";

    if (t.isArray) {
      list[i][0]       = list[i][0].slice(0, -2);
      this[list[i][0]] = this[list[i][0]] || [];
    }

    t.schema   = this.__schema[list[i][0]];
    t.isSchema = t.schema && t.schema.map.length;

    if (t.isSchema) {
      t.split = list[i][1].split(t.schema.delimiter);
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
        this[list[i][0]].push(t.value);
      } else {
        this[list[i][0]] = t.value;
      }
    } else if (t.isArray) {
      this[list[i][0]].push(
        valueByType(list[i][1])
      );
    } else {
      this[list[i][0]] = valueByType(list[i][1]);
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
  let t = [];

  for (var i = 0, n = value.length; i < n; i++) {
    t.push([
      encodeURI(key) + "[]="
    ]);

    for (var x in value[i]) {
      t[i].push(value[i][x]);
    }

    t[i] = t[i][0] + encodeURI(t[i].slice(1).join(schema.delimiter));
  }

  return t.join("&");
}

function schemaObjectToString(key, value, schema) {
  let temp = [ key + "=", [] ];

  value = value || {};

  for (var i = 0, n = schema.map.length; i < n; i++) {
    if (schema.map[i].constant) {
      temp[1].push(schema.map[i].constant);
    } else if (value[schema.map[i]]) {
      temp[1].push(value[schema.map[i]]);
    }
  }

  return encodeURI(
    temp[0] + temp[1].join("+")
  );
}

Search.prototype.toString = function () {
  const search = [];

  for (let k in this) {
    if (this.hasOwnProperty(k) && k.substring(0, 2) !== "__") {
      if (this.__schema[k]) {
        if (this.__schema[k].type === "array") {
          search.push(
            schemaArrayToString(k, this[k], this.__schema[k])
          );
        } else if (this.__schema[k].type === "object") {
          search.push(
            schemaObjectToString(k, this[k], this.__schema[k])
          );
        }
      } else if (
        typeof this[k] === "number" ||
        (typeof this[k] === "string" && this[k].length)
      ) {
        search.push(
          encodeURI(k + "=" + this[k])
        );
      } else if (Array.isArray(this[k])) {
        for (var i = 0, n = this[k].length; i < n; i++) {
          search.push(
            encodeURI(k) + "[]=" + encodeURI(this[k][i])
          );
        }
      }
    }
  }

  return search.length
    ? "?" + search.join("&")
    : "";
};

Search.prototype.set = set;
Search.prototype.clear = clear;

module.exports = Search;