"use strict";

class BaseTriangle {
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

  describe() {
    console.log(
      `Base: ${this.base}, Height: ${
        this.height
      }, Area: ${this.getArea()}, Hipotenuse: ${this.getHipotenuse()}`
    );
  }
}

class ColoredTriangle extends BaseTriangle {
  constructor(base, height, color) {
    super(base, height);
    this.color = color;
  }

  describe() {
    console.log(
      `Base: ${this.base}, Height: ${
        this.height
      }, Area: ${this.getArea()}, Hipotenuse: ${this.getHipotenuse()}, Color: ${
        this.color
      }`
    );
  }
}

class MultiColoredTriangle extends ColoredTriangle {
  constructor(base, height, color, secondColor) {
    super(base, height, color);
    this.secondColor = secondColor;
  }

  describe() {
    console.log(
      `Base: ${this.base}, Height: ${
        this.height
      }, Area: ${this.getArea()}, Hipotenuse: ${this.getHipotenuse()}, Colors: ${
        this.color
      }, ${this.secondColor}`
    );
  }
}

const baseTriangle = new BaseTriangle(10, 20);
const redTriangle = new ColoredTriangle(5, 12, "red");
const rainbowTriangle = new MultiColoredTriangle(3, 4, "red", "blue");
