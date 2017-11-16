module.exports = class Hash {
  constructor(location) {
    this.value = location.hash;
  }

  toString() {
    let str = this.value || "";
    if (str && str[0] !== "#") {
      str = "#" + str;
    }
    return str;
  }
};