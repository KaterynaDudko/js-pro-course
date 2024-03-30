"use strict";

const user = {
  name: "John",
  sing: function (e) {
    console.log(e);
    console.log(`${this.name} is singing`);
  },
};

const btn = document.querySelector(".btn");

// binding event handler to user object
btn.addEventListener("click", user.sing); // undefined is singing
btn.addEventListener("click", user.sing.bind(user)); // John is singing

// bind with interval

class Counter {
  #value;
  #incrementAmount;
  #intervalId;
  #stopValue;

  constructor(startingValue = 0, incrementAmount = 1) {
    this.#value = startingValue;
    this.#incrementAmount = incrementAmount;
    this.#stopValue = startingValue + 10;
    // this.#start();  // uses bind method
    this.#startIncrement(); // uses arrow function
  }

  #start() {
    this.#intervalId = setInterval(this.#increment.bind(this), 1000);
  }

  #increment() {
    this.#value += this.#incrementAmount;
    console.log(this.#value);
    if (this.#value >= this.#stopValue) {
      this.#stop();
    }
  }

  #stop() {
    clearInterval(this.#intervalId);
  }

  #startIncrement() {
    this.#intervalId = setInterval(() => {
      this.#value += this.#incrementAmount;
      console.log(this.#value);
      if (this.#value >= this.#stopValue) {
        this.#stop();
      }
    }, 1000);
  }
}

const counter = new Counter(100);
