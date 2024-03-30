"use strict";

const person = {
  name: "John",
  city: "New York",
  sing: function () {
    return `${this.name} is singing`;
  },
};

console.log(person.sing()); // John is singing
const personSing = person.sing;
// console.log(personSing()); // undefined is singing

class Cat {
  constructor(name) {
    this.name = name;
  }

  dance(style = "salsa") {
    return `Meow, I am ${this.name} and i am dancing ${style}`;
  }
}

const cat = new Cat("Tom");
console.log(cat.dance()); // Meow, I am Tom and i am dancing salsa
const catDance = cat.dance;
// console.log(catDance()); // error cannot read property 'name' of undefined

const otherCat = {
  name: "Jerry",
};

// call()
console.log(cat.dance.call(otherCat, "tango")); // setting this to otherCat and calling a function with an argument

// apply()
console.log(cat.dance.apply(otherCat, ["tango"])); // setting this to otherCat and calling a function with an argument

// bind()
const jerryDance = cat.dance.bind(otherCat); // binds functiong to otherCat and retruns a new function, argument is permanent, cannot be changed
console.log(jerryDance("tango"));

// bind() to bind arguments
function applyDiscount(discount, price) {
  return price - price * discount;
}

const smallDiscount = applyDiscount.bind(null, 0.1); // permanently bind discount to 0.1, when calling function only price is needed
const largeDiscount = applyDiscount.bind(null, 0.2);

console.log(smallDiscount(100)); // 90
console.log(largeDiscount(100)); // 80

function whatIsThis() {
  console.log(`this is: `, this);
}

whatIsThis(); // this is: Window {}, and in strict mode it will be undefined
window.whatIsThis(); // this is: Window {}

const obj = {
  whatIsThis: whatIsThis,
};

obj.whatIsThis(); // this us obj
