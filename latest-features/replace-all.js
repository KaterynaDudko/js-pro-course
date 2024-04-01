/* ------------------------------------------------- */
/* ------------------ Replace All ------------------ */
/* ------------------------------------------------- */

const str = "Hello, World! Hello, World!";
const newStr = str.replaceAll("World", "JavaScript");
console.log(newStr); // Hello, JavaScript! Hello, JavaScript!

// Previous method
const str1 = "Hello, World! Hello, World!";
const newStr1 = str.replace(/World/g, "JavaScript");

console.log(newStr1); // Hello, JavaScript! Hello, JavaScript!

// NOTE replaceAll() is case-sensitive
const str2 = "Hello, World! Hello, World!";
const newStr2 = str2.replaceAll("world", "JavaScript");
console.log(newStr2); // Hello, World! Hello, World!

// but we can use regular expression with the 'i' flag
const newStr3 = str2.replaceAll(/world/gi, "JavaScript");
console.log(newStr3); // Hello, JavaScript! Hello, JavaScript!

// another example using new RegExp() constructor
const str4 = "Hello, World! Hello, World!";
const newStr4 = str4.replaceAll(new RegExp("hello", "gi"), "JavaScript");
console.log(newStr4); // JavaScript, World! JavaScript, World!
