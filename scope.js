const parent = {
  value: 2,
  method() {
    return this.value + 1;
  },
};
const child = {
  __proto__: parent,
};
console.log(child.method()); // 3
