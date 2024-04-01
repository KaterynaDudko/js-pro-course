/* ----------------------------------------------------------- */
/* ----------------------Array.prototype.at() ----------------- */
/* ----------------------------------------------------------- */

const arr = [1, 2, 3, 4, 5];

console.log(arr.at(0)); // 1  the same as arr[0]

// Array.prototype.at() is usefull when you want to access the last element of the array (or elements with negative indexes)
console.log(arr.at(-1)); // 5, the same as arr[arr.length - 1], BUT arr[-1] === undefined

console.log(arr.at(-2)); // 4, the same as arr[arr.length - 2], BUT arr[-2] === undefined
