"use strict";

const myPet = {
  name: "Chrome",
  species: "cat",
  age: 3,
};

const example = {};

// all keys get stringified
example[1] = "one";
example["1"] = "two"; // overwrites previous key

myPet.talk = function () {
  console.log("Meow!");
};

/* ----------------------------------- */

// Mixing Data and Functions in Objects

let triangle = {
  base: 3,
  height: 4,

  getArea: function () {
    return (this.base * this.height) / 2;
  },

  getHipotenuse() {
    return Math.sqrt(this.base ** 2 + this.height ** 2);
  },
};
