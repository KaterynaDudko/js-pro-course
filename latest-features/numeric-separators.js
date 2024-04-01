/* ----------------------------------------------------------- */
/* -----------------------Numeric separators ----------------- */
/* ----------------------------------------------------------- */

// Hard to read
const number = 1000000000;

// Easy to read using numeric separators
const number2 = 1_000_000_000;

console.log(number === number2); // true
console.log(number2); // 1000000000
