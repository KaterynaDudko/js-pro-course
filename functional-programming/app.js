/** -------------------------------------------------------------------------------- **
 ** -----------------------------Functional Programming----------------------------- **
 ** -------------------------------------------------------------------------------- **/

"use strict";

/*** -----------------------Compare pure and impure functions------------------------ ***/

let value = 0;

// NOT PURE FUNCTION, because it changes the value of the variable value
function squareAndUpdateValue(number) {
  value = number * number;
  return value;
}

// PURE FUNCTION, no side effects
function square(number) {
  return number * number;
}

// NOT PURE FUNCTION, because it adds a new element to the array
const colors = ["red", "green", "blue"];

function addToArray(arr, color) {
  arr.push(color);
  return colors;
}

addToArray(colors, "yellow"); // passing the colors array by reference to the function
console.log(colors); // ["red", "green", "blue", "yellow"]

// PURE FUNCTION, no side effects

function addToArrayPure(arr, color) {
  return [...arr, color];
}

const newColors = addToArrayPure(colors, "purple");
console.log(colors); // ["red", "green", "blue", "yellow"]
console.log(newColors); // ["red", "green", "blue", "yellow", "purple"]

/** -----------------------------Higher Order Functions----------------------------- **/

// A function that takes another function as an argument or returns a function, or both

function executeTwice(func) {
  func();
  func();
}

executeTwice(() => console.log("Hello there!"));

function multiplyBy(factor) {
  return function (number) {
    return number * factor;
  };
}

const multiplyByTwo = multiplyBy(2);
console.log(multiplyByTwo(5)); // 10

/** ----------------------------------Immutability---------------------------------- **/
// In FP is it essential to avoid changing the state of the data

const numbers = [1, 2, 3, 4, 5];

// Using functional programming approach, we need to create a new array,
//do whatever we want with it and return it

// To remove the last element from the array
function removeLastElement(arr) {
  return arr.slice(0, arr.length - 1);
}

const newNumbers = removeLastElement(numbers);
console.log(numbers); // [1, 2, 3, 4, 5]
console.log(newNumbers); // [1, 2, 3, 4]

/** -----------------------------------Recursion------------------------------------ **/

// The common example of recursion is the factorial function

function factorial(n) {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(15));

/** ----------------------Partial Application with bind method---------------------- **/
// Partial application is a technique for reducing the number of arguments that a function takes

function greet(greeting, name) {
  return `${greeting}, ${name}`;
}

const sayHello = greet.bind(null, "Hello"); // bind the first argument to "Hello", returns a new function
console.log(sayHello("John")); // Hello, John

/** ----------------------Writing a partial function ourselves---------------------- **/

function multiply(a, b) {
  return a * b;
}

function partial(func, ...fixedArgs) {
  return function (...remainingArgs) {
    return func(...fixedArgs, ...remainingArgs);
  };
}

function fetchData(url, apiKey, params) {
  const querySting = new URLSearchParams(params).toString(); // convert the object to a query string
  console.log(querySting); // page=1&limit=10
  const fullUrl = `${url}?${querySting}&apiKey=${apiKey}`;

  console.log(fullUrl);
}

const apiUrl = "https://api.example.com";
const apiKey = "123456";
const fetchFromApi = partial(fetchData, apiUrl, apiKey); // bind the first two arguments to fetchFromApi function
const params = { page: 1, limit: 10 };

fetchFromApi(params); // https://api.example.com?page=1&limit=10&apiKey=123456

/** -------------------------------Composition Basics------------------------------- **/

const sq = (x) => x * x;
const add = (x, y) => x + y;

// we can use it like this
console.log(add(10, sq(5))); // 35

// Compose two functions
const addAndSquare = (x, y) => sq(add(x, y));
console.log(addAndSquare(10, 5)); // 225

// writing a simple compose function

function compose(func1, func2) {
  return function (...args) {
    return func1(func2(...args));
  };
}

const addAndSquareCompose = compose(sq, add);
console.log(addAndSquareCompose(10, 5)); // 225

// Fancy way to write a compose function

function fancyCompose(...functions) {
  return function (data) {
    return functions.reduceRight((value, func) => func(value), data);
  };
}

function lowerCase(str) {
  return str.toLowerCase();
}

function splitBySpaces(str) {
  return str.split(" ");
}

function joinWithDash(arr) {
  return arr.join("-");
}

const transform = fancyCompose(joinWithDash, splitBySpaces, lowerCase);
console.log(transform("My Little Pony")); // my-little-pony

/** -------------------------------Currying Basics------------------------------- **/
// Currying is turning f(a, b, c)  into f(a)(b)(c).

function sum(a, b, c) {
  return a + b + c;
}

function currySum(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

console.log(currySum(1)(2)(3)); // 6

function fancyCurry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func(...args);
    } else {
      return function (...remainingArgs) {
        return curried.apply(this, args.concat(remainingArgs));
      };
    }
  };
}

const curriedSum = fancyCurry(sum);
console.log(curriedSum(1, 2, 3)); // 6
console.log(curriedSum(1)(2)(3)); // 6

const addToFive = curriedSum(5); // bind the first argument to 5
console.log(addToFive(1, 2)); // 8
