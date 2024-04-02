/** -------------------------------------------------------------------------------- **
 ** -------------------------Javascript Generator Functions------------------------- **
 ** -------------------------------------------------------------------------------- **/

"use strict";

// generator functions are a special type of function that can be paused and resumed

// here we have a generator function that returns the next even number starting from n,
// every time we call next() on the generator object, it will return the next even number
function* evens(n) {
  while (true) {
    yield n; // Pauses the function and returns the value
    n += 2;
  }
}

let allEvens = evens(2); // allEvens is a generator object

console.dir(allEvens, { depth: null, colors: true, showHidden: true });
// ask for the next value
console.log(allEvens.next().value); // 2
console.log(allEvens.next().value); // 4

// We can use a for loop to get the next 10 values, it will start from the last value, in this case 4
for (let i = 0; i < 10; i++) {
  console.log(allEvens.next().value);
}

console.log(allEvens.next().value); // 24

// Fibonacci sequence using a generator function from mdn
function* fibonacci() {
  let current = 0;
  let next = 1;
  while (true) {
    const reset = yield current; // can receive a value from next()
    [current, next] = [next, next + current];
    if (reset) {
      current = 0;
      next = 1;
    }
  }
}

const sequence = fibonacci();
for (let i = 0; i < 100; i++) {
  const num = sequence.next().value;
  console.log(num);

  if (num > Number.MAX_SAFE_INTEGER) {
    console.log("The number is too big");
    console.log(i);
    break;
  }
}

/** -------------------------------Generator usecases------------------------------- **/
// Load data in chunks

const allImages = Array.from({ length: 1000 }, (_, i) => `image-${i}.jpg`);

function* getChunkOfImages(images, chunkSize = 10) {
  let currIndex = 0;
  while (currIndex < images.length) {
    yield images.slice(currIndex, currIndex + chunkSize);
    currIndex += chunkSize;
    console.log("current index", currIndex);
  }
}

const chunkGenerator = getChunkOfImages(allImages, 10);

console.log(chunkGenerator.next().value);
console.log(chunkGenerator.next().value);
