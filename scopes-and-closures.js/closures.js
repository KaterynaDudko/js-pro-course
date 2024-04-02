/** -------------------------------------------------------------------------------- **
 ** ------------------------------------Closures------------------------------------ **
 ** -------------------------------------------------------------------------------- **/

"use strict";
/* NOTE Closure is an ability of a function to remember and access outer function's
    variables even after the outer function has finished executing. */

// This can help to avoid polluting the global scope with variables that are only needed in a specific function.

function outerFunction() {
  let counter = 0;
  return function innerFunction() {
    return `I am inner function, I was invoked for the ${++counter} time`;
  };
}

let innerFunc = outerFunction();
console.log(innerFunc()); // I am inner function, I was invoked for the 1 time
console.log(innerFunc()); // I am inner function, I was invoked for the 2 time
console.log(innerFunc()); // I am inner function, I was invoked for the 3 time
console.log(innerFunc()); // I am inner function, I was invoked for the 4 time

// We can also use closures to create private variables in JavaScript.
// NOTE This can be also a usecase for IIFE, if we know that we will use this function only once.

let counter = (function createCounter() {
  let counter = 0;
  return {
    increment: function () {
      return ++counter;
    },
    decrement: function () {
      return --counter;
    },

    getCounter: function () {
      return counter;
    },
  };
})();

// Here, the counter variable is private and can only be accessed through the returned object.
// We can't access the counter variable directly from outside the createCounter function.

// console.log(counter.counter); // ReferenceError: counter is not defined
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.increment()); // 3
console.log(counter.decrement()); // 2
console.log(counter.getCounter()); // 2

/** --------------------------Closures: Factory Functions--------------------------- **/

function createExponentFunction(exponent) {
  return function (base) {
    return base ** exponent;
  };
}
// This will return a function that looks like this: function (base) { return base ** 2; }
let square = createExponentFunction(2);

// This will return a function that looks like this: function (base) { return base ** 3; }
let cube = createExponentFunction(3);

// So now we can use the square and cube functions to calculate the square and cube of a number,
// without having to pass the exponent every time.

console.log("2 ^ 2 = ", square(2)); // 4
console.log("3 ^ 2 = ", square(3)); // 9

console.log("2 ^ 3 = ", cube(2)); // 8
console.log("3 ^ 3 = ", cube(3)); // 27

function uniqueIdGenerator(prefix) {
  let id = 0;
  return function () {
    return `${prefix}${++id}`;
  };
}

const userIdGenerator = uniqueIdGenerator("user__");
const postIdGenerator = uniqueIdGenerator("post__");
const commentIdGenerator = uniqueIdGenerator("comment__");

console.log("New user id is: ", userIdGenerator()); // user__1
console.log("New user id is: ", userIdGenerator()); // user__2
console.log("New post id is: ", postIdGenerator()); // post__1
console.log("New comment id is: ", commentIdGenerator()); // comment__1

/** --------------------------------Closures: Loops--------------------------------- **/

// NOTE This was a case in the past, when var was used to declare variables.

// this loop will print 6 five times, because the setTimeout function will run after the loop has finished.
for (var i = 1; i < 6; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000 * i);
}

// To fix this, we can use IIFE to create a closure for each iteration of the loop.
// Here output will be 1, 2, 3, 4, 5. Because each iteration of the loop will have its own i variable.
for (var i = 1; i < 6; i++) {
  (function (i) {
    setTimeout(function () {
      console.log(i);
    }, 1000 * i);
  })(i);
}

