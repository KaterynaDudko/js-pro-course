"use strict";

const fs = require("fs");
fs.readFile("haiku1.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

function readFilePromise(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

const files = ["haiku1.txt", "haiku2.txt", "haiku3.txt"];
const promises = files.map((file) => readFilePromise(file));

async function readAllFiles() {
  try {
    const data = await Promise.all(promises);
    return data;
  } catch (error) {
    console.log(error);
  }
}

const data = readAllFiles()
  .then((data) => data.forEach((item) => console.log(item)))
  .catch((error) => console.log(error));
