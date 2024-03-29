"use strict";

class Circle {
  static availableColors = new Set(["red", "blue", "green"]);
  #radius;
  #color;
  #area;

  constructor(radius, color) {
    if (radius <= 0) throw new Error("Radius must be positive.");
    if (!Circle.availableColors.has(color))
      throw new Error("Invalid color. Please choose from red, blue, green.");
    this.#radius = radius;
    this.#color = color;
    this.#area = this.#calcArea();
  }

  #calcArea() {
    return Math.PI * Math.pow(this.#radius, 2);
  }

  get diameter() {
    return this.#radius * 2;
  }

  get radius() {
    return this.#radius;
  }

  set radius(radius) {
    if (radius <= 0) throw new Error("Radius must be positive.");
    this.#radius = radius;
    this.#area = this.#calcArea();
  }

  get color() {
    return this.#color;
  }

  set color(newColor) {
    if (!Circle.availableColors.has(newColor))
      throw new Error("Invalid color. Please choose from red, blue, green.");
    this.#color = newColor;
  }

  get area() {
    return this.#area;
  }
}

const circle = new Circle(10, "red");
const radius = circle.radius;
circle.radius = 20;
// circle.radius = -10; // Error: Radius must be positive.
circle.color = "blue";
// circle.color = "yellow"; // Error: Invalid color. Please choose from red, blue, green.
