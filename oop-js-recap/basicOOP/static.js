class Cat {
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }

  meow() {
    return `${this.name} says Meow!`;
  }

  static scientificName = "Felis catus";

  // usecase for static method is to create a factory method to help create instances of the class
  static registerStrayCat() {
    //prettier-ignore
    const defaultCatNames = ["Misty", "Muffin", "Whiskers", "Fluffy", "Socks", "Tiger", "Oreo", "Chloe", "Ginger", "Smokey"];
    const randomIndex = Math.floor(Math.random() * defaultCatNames.length);
    const name = defaultCatNames[randomIndex];
    return new Cat(name, "Mixed");
  }
}

const myCat = new Cat("Chrome", "Mainecoon");

const strayCat = Cat.registerStrayCat();

// usecase for static methods is to create utility functions that are related to the class
// for example, a MathHelper class that has static methods for basic math operations
// we don't need to create an instance of MathHelper to use its methods
class MathHelper {
  constructor() {
    if (this.constructor == MathHelper)
      throw new Error("This class cannot be instantiated");
  }
  static add(a, b) {
    return a + b;
  }

  static subtract(a, b) {
    return a - b;
  }

  static multiply(a, b) {
    return a * b;
  }

  static divide(a, b) {
    return a / b;
  }
}

const sum = MathHelper.add(5, 10);
// const temp = new MathHelper(); // this will throw an error
