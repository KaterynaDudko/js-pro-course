"use strict";

class Triangle {
  constructor(base = 3, height = 4) {
    if (!Number.isFinite(base) || base <= 0) {
      throw new Error("Base must be a positive number");
    }
    if (!Number.isFinite(height) || height <= 0) {
      throw new Error("Height must be a positive number");
    }
    this.base = base;
    this.height = height;
  }
  getArea() {
    return (this.base * this.height) / 2;
  }

  getHipotenuse() {
    return Math.sqrt(this.base ** 2 + this.height ** 2);
  }

  showTriangleInfo() {
    console.log(
      `Base: ${this.base}, Height: ${
        this.height
      }, Area: ${this.getArea()}, Hipotenuse: ${this.getHipotenuse()}`
    );
  }
}

const newTriangle = new Triangle();
const secondTriangle = new Triangle(5, 12);

/*
console.log(typeof newTriangle); // object
console.log(secondTriangle instanceof Triangle); // true
*/
