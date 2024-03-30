"use strict";

// how we used oop when there was no class keyword

// 1. Constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// This is not gonna work
// Person("John", 30); // undefined or error in strict mode

/* To make it work, we need to use the new keyword
    The new keyword creates a new object
    Sets the value of 'this' to the new object
    Returns this object
*/
const john = new Person("John", 30);

/* ---------------------------------------------------- */
/* ------------------- Prototypes ---------------------- */
/* ---------------------------------------------------- */

// When we use classes, methods are added to the prototype, not the object itself
class Dog {
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }

  bark() {
    console.log(`Woof! My name is ${this.name}`);
  }

  sleep() {
    console.log(`${this.name} is sleeping`);
  }
}

const dog = new Dog("Buddy", "Golden Retriever"); // methods is added to the prototype

// When we use constructor functions, methods are added to the object itself, so each object has its own copy of the method
function Cat(name, breed) {
  this.name = name;
  this.breed = breed;

  this.meow = function () {
    console.log(`Meow! My name is ${this.name}`);
  };

  this.sleep = function () {
    console.log(`${this.name} is sleeping`);
  };
}

const cat = new Cat("Whiskers", "Siamese"); // methods are added to every created object

// Check if the methods are shared between objects
const dog2 = new Dog("Max", "Labrador");
const cat2 = new Cat("Fluffy", "Persian");

console.log(dog.bark === dog2.bark); // true
console.log(cat.meow === cat2.meow); // false

// Every object has a __proto__ property that points to the prototype of the constructor function that created it
// We can youse it, BUT actually we SHOULD NOT use it
// We should not add methods to the __proto__ property directly, it is used by JS internally
console.log(dog.__proto__); // Dog has { bark: [Function], sleep: [Function] }
console.log(cat.__proto__); //

//Better way to see the prototype of the objects
console.log(Dog.prototype); // Dog has { bark: [Function], sleep: [Function] }
console.log(Cat.prototype);

//Check if the prototype of the objects are the same
console.log(Object.getPrototypeOf(dog) === Dog.prototype); // true
console.log(Dog.prototype === Cat.prototype); // false

// So, instead of adding methods to the object itself, we can add them to the prototype
function Bird(name, breed) {
  this.name = name;
  this.breed = breed;
}

Bird.prototype.tweet = function () {
  console.log(`Tweet! My name is ${this.name}`);
};

Bird.prototype.sleep = function () {
  console.log(`${this.name} is sleeping`);
};

const bird1 = new Bird("Tweety", "Canary");
const bird2 = new Bird("Polly", "Parrot");

console.log(bird1.tweet === bird2.tweet); // true

/* ---------------------------------------------------- */
/* ---------------- Prototype chain ------------------- */
/* ---------------------------------------------------- */

//simple example of prototype chain

const grandParent = {
  name: "GrandParent",
  sleep() {
    console.log(`Hello, i am sleeping`);
  },
};

const parent = {
  name: "Parent",
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  },
};

Object.setPrototypeOf(parent, grandParent); // parent.prototype now set to grandParent, so parent can access grandParent's properties

const child = {
  age: 10,
};

/** child.prototype now set to parent,
 ** child can access parent's properties,
 ** and can access also grandParent's properties because parent.prototype is set to grandParent
 */

Object.setPrototypeOf(child, parent);
child.greet(); // Hello, my name is Parent
child.sleep(); // Hello, i am sleeping

/** also we can create a new object with Object.create() method
 * to set the prototype on the new object to object passed as an argument
 */
const grandChild = Object.create(child);
grandChild.name = "GrandChild";
grandChild.age = 5;

console.log(grandChild); // {name: "GrandChild", age: 5}
// better way to see the prototype chain
console.log(Object.getPrototypeOf(grandChild)); // {age: 10}  Prototype chain: child -> parent -> grandParent -> Object

// than we changge the prototype of the grandChild
// This doen't change object's properties, it changes the prototype of the object
Object.setPrototypeOf(grandChild, parent);

console.log(grandChild); // {name: "GrandChild", age: 5}

// properties of the grandChild object are not changed, but the prototype chain is changed, there is no child in the prototype chain
console.log(Object.getPrototypeOf(grandChild)); // Prototype chain:  parent -> grandParent -> Object

// check if the grandParent is in the prototype chain of the grandChild
console.log(grandParent.isPrototypeOf(grandChild)); // true
/* ---------------------------------------------------- */
// another example of prototype chain

function Vehicle(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

Vehicle.prototype.honk = function () {
  return "Beep!";
};

function Car(make, model, year) {
  Vehicle.call(this, make, model, year); // similar to "super(make, model, year)"
}

// Link Car prototype to Vehicle prototype so that Car can access Vehicle's methods
Car.prototype = Object.create(Vehicle.prototype);
console.log(Car.prototype); // Car prototype is Vehicle, so it has honk method

// Set the constructor property to Car,
// so when we create a new Car object, it will have the Car constructor
// instead of the Vehicle constructor
Car.prototype.constructor = Car;
