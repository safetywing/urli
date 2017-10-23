function Origin(location) {
  this.__origin = location.origin;
}

Origin.prototype.toString = function () {
  return this.__origin ? this.__origin : "";
};

module.exports = Origin;