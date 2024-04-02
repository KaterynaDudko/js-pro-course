/** -------------------------------------------------------------------------------- **
 ** ------------------------------Working with numbers------------------------------ **
 ** -------------------------------------------------------------------------------- **/

"use strict";

/** -------------------------------Float Inprecision-------------------------------- **/
// 0.1 + 0.2 === 0.3; // false
console.log("In JS 0.1 + 0.2 = 0.3 is", 0.1 + 0.2 === 0.3); // false
console.log("0.1 + 0.2 = ", 0.1 + 0.2); // 0.30000000000000004

// There are a lot of libraries that can help with this issue
// Also we can use helper functions
function areFloatsEqual(a, b) {
  return Math.abs(a - b) < Number.EPSILON;
}

console.log(
  "Using helper function: 0.1 + 0.2 === 3 is ",
  areFloatsEqual(0.1 + 0.2, 0.3)
); // true

/** -----------------------BigInt() and Really Large Numbers------------------------ **/

//The biggest number that can be represented in JS:
console.log(Number.MAX_VALUE); // 1.7976931348623157e+308

// THe biggest safe integer that we can do math with
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991

// BigInt is a new primitive type in JavaScript that can represent integers with arbitrary precision
const bigNumber = 2342342835235235092384n;
console.log(bigNumber);

// We can't mix BigInt with regular numbers
// console.log(bigNumber + 100); // Error

// We need to convert the regular number to BigInt
console.log(bigNumber + BigInt(100)); // 2342342835235235092484n
console.log(bigNumber * 35n); // 819324994832832285344n
console.log(bigNumber / 35n); // 66952766720922431210n

// console.log(Math.sqrt(16n)); // Error

/** ---------------------------isNan() vs Number.isNaN()---------------------------- **/
console.log(0 / 0); // NaN
console.log(Number("hello")); // NaN

// NaN is the only value in JavaScript that is not equal to itself
console.log(NaN === NaN); // false
console.log(0 / 0 === 0 / 0); // false

// We can use isNaN() to check if a value is NaN
console.log("Using isNaN()");
console.log(isNaN(NaN)); // true
console.log(isNaN(0 / 0)); // true
console.log(isNaN("hello")); // true
console.log(isNaN([])); // false [] is converted to 0

// Number.isNaN() is a better alternative
console.log("Using Number.isNaN()");
console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN(0 / 0)); // true
console.log(Number.isNaN("hello")); // false
console.log(Number.isNaN([])); // false
