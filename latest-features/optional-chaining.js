/* -------------------------------------------------------------------------- */
/* --------------------------Optional Chaining ------------------------------ */
/* -------------------------------------------------------------------------- */

const user = {
  name: "Cat",
  address: {
    city: "New York",
  },
  contact: {
    email: "test@gmail.com",
    phone: "5551234",
  },

  greet() {
    console.log("Hello");
  },
};

// NOTE Traditional way: Check each property in the chain
const city = user && user.address && user.address.city;

// NOTE With Optional Chaining
const optCity = user?.address?.city; // Outputs: 'New York'

// const email = user.contactDetail.email; // Outputs: ' Cannot read property 'email' of undefined'
const optEmail = user?.contactDetail?.email || "not provided";
console.log(optEmail); // Outputs: 'not provided'

// NOTE Optional Chaining with function
user?.greet?.(); // Outputs: 'Hello'
user?.greet2?.(); // no error
