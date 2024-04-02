/** -------------------------------------------------------------------------------- **
 ** ------------------------Recapping Var, Let, Const Scopes------------------------ **
 ** -------------------------------------------------------------------------------- **/

"use strict";

//Even though the variable is declared in an if block,
//after the console.log statement, it is hoisted to the top of the scope
//NOTE  undefined (hoisted), not ReferenceError as with let and const

console.log(user); // undefined, as the variable is hoisted

// the biggest disadvantage of var is that it allows re-declaration before the variable is declared in the code
user = "Cat";
console.log(user); // Cat

// The var keyword has function scope
function varScope() {
  if (true) {
    var name = "John";
  }
  console.log(name); // John
}

// console.log(name); // ReferenceError: name is not defined

if (true) {
  var user = "John";
}
console.log(user); // John

// Another bad example of var :)
for (var i = 0; i < 5; i++) {
  console.log(i); // 0 1 2 3 4
}
console.log(i); // 5 i is still accessible outside the loop

// console.log(window.user); // John - var is added to the global object (window) in the browser, but not in Node.js

// NOTE this will overwrite the global variable in window object in the browser
// var origin = "global";
/** ------------------------------Let and Const Scopes------------------------------ **/

let origin = "global"; // global scope, but this will NOT overwrite the global variable in window object in the browser

if (true) {
  let happy = "happy"; // local scope
  console.log(happy); // local
}

console.log(happy); // ReferenceError: happy is not defined
