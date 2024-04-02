/** -------------------------------------------------------------------------------- **
 ** -------------------------------------Scopes------------------------------------- **
 ** -------------------------------------------------------------------------------- **/

"use strict";

/** --------------------------------The Scope Chain--------------------------------- **/

/* When we use variables in JavaScript, the JavaScript engine looks for the variable in this order: 
    1. The current local scope.   
    2. Any outer function scope. 
    3. The global scope.             */

let age = 30; // global scope

function showAge() {
  return age; // 30
}

function sayAge() {
  let age = 25; // function scope
  return age; // 25
}

function sayAgeAgain() {
  let age = 20;
  if (true) {
    return age; // 20
  }
}

function outer() {
  age = 10; // will change the global variable
  function inner() {
    let age = 15;
    return age;
  }
  return inner(); // 15
}

console.log("Looking for age in global scope: ", showAge()); // 30
console.log("Looking for age in function scope: ", sayAge()); // 25
console.log("Looking for age in outer function scope: ", sayAgeAgain()); // 20
console.log("Looking for age in inner function scope: ", outer()); // 15

/** ----------------------------------Static Scope---------------------------------- **/

let animal = "Dog"; // global scope

function showAnimal() {
  return animal; // Dog
}

function sayAnimal() {
  let animal = "Cat"; // function scope

  // JS doesn't care that we call showAnimal() from here where animal is "Cat".
  // In shiwAnimal() function, JS will look for the variable using the scope chain.
  return showAnimal(); // return Dog
}

console.log("Animal in showAnimal() ", showAnimal()); // Dog
console.log("Animal in sayAnimal() ", sayAnimal()); // Dog

/** ------------------------------------Hoisting------------------------------------ **/

/*
    Hoisting is JavaScript's default behavior of moving declarations to the top of the current scope.
    In JavaScript, a variable can be declared after it has been used.
    In other words, a variable can be used before it has been declared.
    
    NOTE: Only the declaration is hoisted, not the initialization.
    NOTE: THis works only with var, NOT with let and const.

    the next code snippet will be hoisted as follows:
    var food;
    console.log(food);
    food = "Pizza";
*/

console.log("Global food is: ", food); // undefined
var food = "Pizza";

// In function scope, the variable is hoisted to the top of the function, NOT to the top of the global scope
function hoist() {
  console.log("Food is: ", food); // undefined
  var food = "Pizza";
}

hoist();

/* NOTE let and const are hoisted by JS, but NOT in a way so they cannot be used before they are declared.
    This is called Temporal Dead Zone (TDZ). 

function hoistLet() {
  // Temporal Dead Zone (TDZ) starts here
  console.log(food); // ReferenceError: Cannot access 'food' before initialization
  let food = "Pizza";
  // Temporal Dead Zone (TDZ) ends here
}

*/

function blah() {
  if (false) {
    var x = 5;
  }
  // NOTE if we use let instead of var, we will get ReferenceError: x is not defined
  console.log("x is: ", x); // undefined, might be surprising, but it's because of hoisting
}

/** --------------------------------------IIFE-------------------------------------- **/

// IIFE - Immediately Invoked Function Expression
// This is a function that is executed immediately after it is created, and it is used to avoid polluting the global scope.
// We cannot use the function again, as it is anonymous and  not stored in a variable.

(function () {
  console.log("IIFE is executed immediately");
})();
