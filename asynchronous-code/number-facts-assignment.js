"use strict";

const BASE_URL = "http://numbersapi.com";

/**
 * Function, that makes a request to the Numbers API to get trivia about a number.
 *
 */
async function showNumberTrivia(num) {
  const headers = new Headers({
    "Content-Type": "application/json",
  });
  try {
    const response = await fetch(`${BASE_URL}/${num}`, { headers });
    if (!response.ok) {
      throw new Error("Error fetching number trivia");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

/**
 * Function, that asks for trivia about four different numbers (using four separate requests),
 * but, as soon as one request returns, log the piece of trivia for the winning number to the console.
 *
 */

async function showNumberRace([num1, num2, num3, num4]) {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  const requests = [
    fetch(`${BASE_URL}/${num1}`, { headers }),
    fetch(`${BASE_URL}/${num2}`, { headers }),
    fetch(`${BASE_URL}/${num3}`, { headers }),
    fetch(`${BASE_URL}/${num4}`, { headers }),
  ];

  try {
    const response = await Promise.race(requests);
    if (!response.ok) {
      throw new Error("Error fetching all numbers trivia");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

/**
 * Function, that asks for trivia about about different numbers.
 * Make all of the requests at the same time, but handle them once all requests are completed.
 * At least one of the “numbers” is invalid, so some of the requests will fail.
 * Logs to the console the array of trivia for responses with a successful status code,
 * and the array of error messages for the responses with a failed status code.
 */

async function showNumberAll() {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  const requests = [
    fetch(`${BASE_URL}/1`, { headers }),
    fetch(`${BASE_URL}/10}`, { headers }),
    fetch(`${BASE_URL}/30`, { headers }),
    fetch(`${BASE_URL}/21`, { headers }),
    fetch(`${BASE_URL}/ddd`, { headers }),
    fetch(`${BASE_URL}/54}`, { headers }),
    fetch(`${BASE_URL}/31`, { headers }),
    fetch(`${BASE_URL}/oopsy`, { headers }),
    fetch(`${BASE_URL}/10`, { headers }),
  ];

  const trivias = [];
  const errors = [];

  try {
    const responses = await Promise.allSettled(requests);
    // console.log(require("util").inspect(responses, { depth: null }));
    const data = await Promise.allSettled(
      responses.map(async (response) => {
        if (response.status === "fulfilled" && response.value.ok === true) {
          const data = await response.value.json();
          trivias.push(data.text);
        }
        if (response.status === "fulfilled" && response.value.ok === false) {
          errors.push(`${response.value.status}: ${response.value.statusText}`);
        }
      })
    );
    // console.log(data);
  } catch (error) {
    console.error(error);
  }
  console.log("Trivias: ", trivias);
  console.log("Errors: ", errors);
}

/**
 * Fnction, which calls all three functions, in order, moving onto the next
 * function only after the current function fully completes.
 */

async function main() {
  await showNumberTrivia(82);
  await showNumberRace([423, 332, 34444, 32]);
  await showNumberAll();
}

main();
