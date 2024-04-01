/* --------------------------------------------------------------- */
/*--------------- Nullish Coalescing Operator -------------------- */
/* --------------------------------------------------------------- */

const user = {
  name: "Cat",
  address: {
    city: "New York",
  },
  age: 0,
  birthDate: null,
};

// Use ?? when we want to check if the value is null or undefined
const age = user?.age || "Age not provided"; // Outputs: 'Age not provided', 0 is falsy value
const userAge = user?.age ?? "Age not provided"; // Outputs: 0

const birthDate = user?.birthDate || "Birth date not provided"; // Outputs: 'Birth date not provided', null is falsy value
const userBirthDate = user?.birthDate ?? "Birth date not provided"; // Outputs: Birth date not provided

console.log(userBirthDate, birthDate);
