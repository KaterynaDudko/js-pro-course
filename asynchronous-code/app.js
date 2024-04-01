"use strict";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const url = `${BASE_URL}/1`;

function fetchDataWithFetch() {
  fetch(url)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
}

// One of the methods to avoid callback hell
function fetchDataChained() {
  fetch(`${BASE_URL}/1`)
    .then((res1) => {
      console.log(res1);

      // Promise chaining, we return a promise
      return fetch(`${BASE_URL}/2`);
    })
    .then((res2) => {
      console.log(res2);
    })
    .catch((error) => console.log(error));
}

async function fetchData() {
  try {
    const response = await fetch(`${BASE_URL}/1`);
    console.log(response);

    const response2 = await fetch(`${BASE_URL}/2`);
    console.log(response2);

    const response3 = await fetch(`${BASE_URL}/3`);
    console.log(response3);
  } catch (error) {
    console.log(error);
  }
}



// Parallel async operations

const results = [];

async function fetchPockemon1() {
  const response = await fetch(`${BASE_URL}/1`);
  const data = await response.json();
  results.push(data);
}

async function fetchPockemon2() {
  const response = await fetch(`${BASE_URL}/2`);
  const data = await response.json();
  results.push(data);
}

async function fetchPockemon3() {
  const response = await fetch(`${BASE_URL}/3`);
  const data = await response.json();
  results.push(data);
}

// fetchPockemon1();
// fetchPockemon2();
// fetchPockemon3();

// console.log(results);

// Sequential async operations

async function fetchPockemonSequential() {
  const response1 = await fetch(`${BASE_URL}/1`);
  const data1 = await response1.json();
  results.push(data1);

  const response2 = await fetch(`${BASE_URL}/2`);
  const data2 = await response2.json();
  results.push(data2);

  const response3 = await fetch(`${BASE_URL}/3`);
  const data3 = await response3.json();
  results.push(data3);

  console.log(results);
}

// Promise.all

function fetchPockemon(id) {
  return fetch(`${BASE_URL}/${id}`);
}

const fetchCalls = [
  fetchPockemon(1),
  fetchPockemon(2),
  fetchPockemon(3),
  fetchPockemon(4),
  fetchPockemon(5),
  fetchPockemon(6),
  fetchPockemon(7),
  fetchPockemon(8),
  fetchPockemon(9),
  fetchPockemon(10),
];

// If some usrl is invalid, Promise.all will reject whole promise
// fetchCalls.push(fetch("https://nope.nope"));
Promise.all(fetchCalls)
  .then((responses) => {
    //
    console.log(responses);
  })
  .catch((error) => console.log(error));

// Promise.allSettled
const GITHUB_BASE_URL = "https://api.github.com";

let elieP = fetch(`${GITHUB_BASE_URL}/users/elie`);

let joelP = fetch(`${GITHUB_BASE_URL}/users/joelburton`);

let doesNotExistP = fetch(`${GITHUB_BASE_URL}/user/dsdsdsds`);

let badUrlP = fetch("http://definitelynotarealsite.com");

async function fetchUsers() {
  let allSettledResults = await Promise.allSettled([
    elieP,
    joelP,
    doesNotExistP,
    badUrlP,
  ]);

  console.log(allSettledResults);
}

fetchUsers();
/*
  {status: 'fulfilled', value: Response}
  {status: 'fulfilled', value: Response}
  {status: 'fulfilled', value: Response}
  {status: 'rejected', reason: TypeError: Failed to fetch ...}
*/

// Promise.raсe

Promise.race(fetchCalls)
  .then((response) => {
    console.log("The winner is");
    console.log(response);
  })
  .catch((error) => console.log(error));

// Build own Promise

function myPromise(sec) {
  return new Promise((resolve, reject) => {
    if (sec <= 0) reject("Invalid time");
    setTimeout(() => {
      resolve("Success!");
    }, sec);
  });
}

async function runMyPromise(sec) {
  try {
    const result = await myPromise(sec);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

runMyPromise(6000);

myPromise(10000)
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

// Promise.any()
/* NOTE Promise.any() differs from Promise.race() in that it will only reject if all promises are rejected.
 ** While Promise.race will reject as soon as the first promise is rejected. */

const fetchCalls2 = [
  fetch("nope.nope"),
  fetch("nope.nope"),
  fetch("nope.nope"),
  fetch("nope.nope"),
  fetch("nope.nope"),
  fetch("nope.nope"),
];

// Promise.any(fetchCalls2) will be rejected because all fetch calls are rejected
Promise.any(fetchCalls2)
  .then((response) => console.log(response))
  .catch((error) => console.log(error));

//Promise.any() will be resolved because at least one fetch call is resolved
const fetchCalls3 = [
  fetch("nope.nope"),
  fetch("nope.nope"),
  fetch("nope.nope"),
  fetch("nope.nope"),
  fetch("nope.nope"),
  fetch("nope.nope"),
  fetch(`${BASE_URL}/1`),
];

Promise.any(fetchCalls3)
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

