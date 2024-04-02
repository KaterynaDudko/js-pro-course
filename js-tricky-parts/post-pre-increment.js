/** -------------------------------------------------------------------------------- **
 ** -----------------------------Post and Pre Increment----------------------------- **
 ** -------------------------------------------------------------------------------- **/

"use strict";

// Changing the value after returning it
class Counter {
  constructor() {
    this.value = 0;
  }

  postIncrement() {
    console.log(`Cur value: ${this.value}`);
    return this.value++;
  }

  preIncrement() {
    console.log(`Cur value: ${this.value}`);
    return ++this.value;
  }
}

const counter = new Counter();
console.log("postIncrement returns: ", counter.postIncrement()); // 0
console.log("preIncrement return:", counter.preIncrement()); // 2

/** -------------------------Automatic semicolon insertion-------------------------- **/

// JavaScript automatically inserts semicolons at the end of a line if it's missing
// This can lead to unexpected behavior
// For example, the following code will return undefined if we explicitly place {} on the next line after return

function returnObject() {
  //prettier-ignore
  return //VS Code or JS will insert a semicolon here and the function will return undefined
  {
    message: "Hello";
  }
}

console.log(returnObject()); // undefined
