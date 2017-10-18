module.exports = class Origin {
  constructor(location) {
    this.__origin = location.origin;
  }

  toString() {
    return this.__origin ? this.__origin : "";
  }
};