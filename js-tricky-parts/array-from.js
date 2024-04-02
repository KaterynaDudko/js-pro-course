/** -------------------------------------------------------------------------------- **
 ** ------------------------------Array.from() Method------------------------------- **
 ** -------------------------------------------------------------------------------- **/

"use strict";

// The Array.from() method creates a new, shallow-copied Array instance from an array-like or iterable object.
const strToArr = Array.from("Hello");
console.log(strToArr); // [ 'H', 'e', 'l', 'l', 'o' ]

// Turn an array-like object into an array
const set = new Set(["foo", "bar", "baz", "foo"]);
const arrFromSet = Array.from(set);
console.log(arrFromSet); // [ 'foo', 'bar', 'baz' ]

// To work with DOM elements
// const divs = document.querySelectorAll("div");
// const divArr = Array.from(divs); // Convert NodeList to Array

// Array.from() can take a second argument, a map function, to apply to each element in the array
const arr = [1, 2, 3, 4, 5];

const newArr = Array.from(arr, (x) => x * 2);
console.log(newArr); // [ 2, 4, 6, 8, 10 ]

// To create an array of a certain length
const arrOfLength = Array.from({ length: 5 });
console.log(arrOfLength); // [ undefined, undefined, undefined, undefined, undefined], because we didn't provide a map function

// To create an array of a certain length with a map function
const arrOfLengthWithMap = Array.from({ length: 5 }, (_, i) => i * 100); // _ is a placeholder for the first argument, which is the value of the element
console.log(arrOfLengthWithMap); // [ 0, 100, 200, 300, 400 ]

/** -----------------------------------Exercises------------------------------------ **/

/* Create a function parseAndCheck that takes an array of values.
 ** The function should return a new array with all values parsed to a number using parseFloat .
 ** If the parsing results in a NaN, throw an error with the message "Invalid Number" */

function parseAndCheck(values) {
  return Array.from(values, (value) => {
    const num = parseFloat(value);
    if (Number.isNaN(num)) {
      throw new Error(`Invalid Number`);
    }
    return num;
  });
}

// parseAndCheck([1, 2, 3, "a"]); // Error: Invalid number
console.log(parseAndCheck([1, 2, 3, "4"])); // [ 1, 2, 3, 4 ]
console.log(parseAndCheck([1, 2, 3.10233423, "4", "5"])); // [ 1, 2, 3.10233423, 4, 5 ]

/* rangeGenerator Exercise
 ** Implement a generator function rangeGenerator that takes two arguments start and end and yields numbers in the range[start, end].
 ** If start is greater than end, the generator should yield numbers in a reverse order. */

function* rangeGenerator(start, end) {
  if (start < end) {
    for (let i = start; i <= end; i++) {
      yield i;
    }
  } else {
    for (let i = start; i >= end; i--) {
      yield i;
    }
  }
}

const range = rangeGenerator(1, 5);
console.log([...range]); // [ 1, 2, 3, 4, 5 ]
