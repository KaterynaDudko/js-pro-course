/** -------------------------------------------------------------------------------- **
 ** ---------------------------Closures:  Event Listeners--------------------------- **
 ** -------------------------------------------------------------------------------- **/

"use strict";

const btn = document.querySelector(".btn");

// We can use closures to create event listeners that can access variables from the outer scope.

// Here we use IIFF to create a callback function for an event listener,
//that can access the counter variable because of the closure.
btn.addEventListener(
  "click",
  (function () {
    let counter = 0;
    return function () {
      console.log(`Button was clicked ${++counter} times`);
    };
  })()
);

// This function when called will create an event listener for a button with the given id.
// Callback function for the event listener will have access to the counter variable because of the closure.
function createButtonClickedCounter(id) {
  const btn = document.getElementById(id);
  let counter = 0;
  btn.addEventListener("click", function () {
    console.log(`Button ${id} was clicked ${++counter} times`);
  });
}

createButtonClickedCounter("btn1");
createButtonClickedCounter("btn2");
createButtonClickedCounter("btn3");

