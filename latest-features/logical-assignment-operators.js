/** -------------------------------------------------------------------------------- **
 ** --------------------------Logical Assignment Operators-------------------------- **
 ** -------------------------------------------------------------------------------- **/

const todo = { priority: 1, completed: false, task: "Buy milk" };

// Logical OR assignment ||=
todo.priority ||= "Medium"; // === todo.priority = todo.priority || "Medium"
console.log(todo.priority); // 1

// Logical AND assignment &&=
let loggedInUser;

loggedInUser &&= { ...loggedInUser, theme: "dark" };
console.log(loggedInUser); // undefined

loggedInUser = { name: "John" };
loggedInUser &&= { ...loggedInUser, theme: "dark" };
console.log(loggedInUser); // { name: "John", theme: "dark" }

// Nullish coalescing assignment ??=
let user = { name: "John", age: 30 };

user.theme ??= "light";
console.log(user); // { name: "John", age: 30, theme: "light" }

function writeTitleRow(input) {
  let rv = ``;
  const pattern = /^header\((.*?)\)$/;
  const result = pattern.exec(input);
  rv += result[1];
  return rv;
}

console.log(writeTitleRow("header(Logical Assignment Operators)"));
