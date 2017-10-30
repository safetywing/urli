function Origin(location) {
  this.value = location.origin;
}

Origin.prototype.toString = function () {
  return this.value ? this.value : "";
};

module.exports = Origin;