export default function clear() {
  for (var k in this) {
    if (this.hasOwnProperty(k)) {
      this[k] = undefined;
    }
  }
  return this;
}