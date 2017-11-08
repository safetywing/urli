export default function set(props) {
  for (var k in props) {
    this[k] = props[k];
  }
  return this;
}