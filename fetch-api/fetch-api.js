/** -------------------------------------------------------------------------------- **
 ** -----------------------------------Fetch API------------------------------------ **
 ** -------------------------------------------------------------------------------- **/

"use strict";

const POKE_API = "https://pokeapi.co/api/v2/pokemon/";
const MY_TOKEN = "my-token"; // should be replaced with actual token

async function getPokemonData(pokemonName) {
  const pokemon = pokemonName.toLowerCase();
  try {
    const response = await fetch(`${POKE_API}${pokemon}`); //
    if (!response.ok) {
      console.log(response);
      throw new Error(
        `Pokemon with name ${pokemonName} not found. Please check the name try again.`
      );
    }
    const data = await response.json(); // converts the ReadableStream to JSON
    return data;
  } catch (error) {
    console.error(error);
  }
}

// const pokemonName = "Pikachu";
// getPokemonData(pokemonName).then((data) => {
//   console.log(data);
// });

/** -----------------------------Headers with fetch API----------------------------- **/

// new Headers() - creates a new Headers object instance, making sure it is a valid HTTP header

function fetchData(url) {
  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${MY_TOKEN}`,
  });

  try {
    const response = fetch(url, { headers });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

/** ---------------------------POST Request with fetch()---------------------------- **/

function makePostRequest(url, payload) {
  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${MY_TOKEN}`,
  });

  try {
    const response = fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("Failed to post data");
    }
    const responseData = response.json();
    return responseData;
  } catch (error) {
    console.error(error);
  }
}

/** --------------------------Sending File with Fetch API--------------------------- **/

function uploadFile(url, file) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = fetch(url, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to upload file");
    }
    const responseData = response.json();
    return responseData;
  } catch (error) {
    console.error(error);
  }
}

const fileInput = document.querySelector("#my-file");

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];

  //   uploadFile("https://api.example.com/upload", file); // replace with actual URL
});
