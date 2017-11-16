module.exports = class Hash {
  constructor(location) {
    this.value = location.hash;
  }

  toString() {
    return this.value ? this.value : "";
  }
};