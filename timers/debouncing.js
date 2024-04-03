/** -------------------------------------------------------------------------------- **
 ** ---------------------------Debouncing and Throttling---------------------------- **
 ** -------------------------------------------------------------------------------- **/

// Debouncing is a technique used to limit the rate at which a function is called.
// When you debounce a function, you prevent it from being called too often.

const BASE_URL = "https://dog.ceo/api/breed";
let searchTerm = ""; // nees this to save serch input for throttling

const backToTopBtn = document.querySelector(".button_to-top");

const showDebouncingBtn = document.querySelector(
  ".menu__button_option_show-debounce"
);
const imagesContainer = document.querySelector(".img-collection__images");
const imgCollection = document.querySelector(".img-collection");
showDebouncingBtn.addEventListener("click", () => {
  hideCountdown();
  hideAnimationContainer();
  if (imgCollection.classList.contains("hidden")) {
    showDebouncingBtn.innerText = "Hide debouncing";
    imgCollection.classList.remove("hidden");
    return;
  }
  hideImageContainer();
});

function hideImageContainer() {
  imagesContainer.textContent = ""; // clear images when switching between debouncing and countdown
  imgCollection.classList.add("hidden");
  showDebouncingBtn.innerText = "Show debouncing";
  backToTopBtn.classList.add("hidden");
}
const dogsSeachEl = document.querySelector("#search-dogs");
dogsSeachEl.addEventListener("input", debounce(onSearch, 500));

function debounce(fn, delay) {
  let timeoutId;
  return function (...arguments) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...arguments);
    }, delay);
  };
}

async function onSearch(event, scrolling = false) {
  const searchValue = scrolling ? searchTerm : event.target.value;
  if (!scrolling) {
    imagesContainer.textContent = ""; // clear images container if it is a new search
    searchTerm = searchValue;
    backToTopBtn.classList.add("hidden");
  }

  if (scrolling) {
    backToTopBtn.classList.remove("hidden");
  }

  if (searchValue.length > 2) {
    fetch(`${BASE_URL}/${searchValue}/images/random/12`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No images found for this breed. Please try again.");
        }
        return response.json();
      })
      .then((data) => {
        const images = data.message;
        images.forEach((img, searchValue) => {
          const imgCard = createImageCard(img, searchValue);
          imagesContainer.appendChild(imgCard);
        });
        if (!scrolling) event.target.value = "";
      })
      .catch((error) => {
        showError(error);
      });
  }
}

function createImageCard(img, breed) {
  const cardEl = document.createElement("div");
  cardEl.classList.add("card", "card_size_m");
  const imgEl = document.createElement("img");
  imgEl.src = img;
  imgEl.alt = breed;
  imgEl.classList.add("card__image");
  cardEl.appendChild(imgEl);
  return cardEl;
}

function showError(error) {
  console.error(error);
  const errorEl = document.createElement("div");
  errorEl.classList.add("error");
  errorEl.textContent = error.message;
  imagesContainer.appendChild(errorEl);
}

/*** -----------------------------------Throttling----------------------------------- ***/

// Throttling is a technique used to ensure that the function is called at a regular interval.

// Simple throttle implementation. Better to use Lodash throttle function
function throttle(fn, delay = 500) {
  let isThrottled = false;

  return function (...arguments) {
    if (isThrottled) return;
    isThrottled = true;
    fn(...arguments);
    setTimeout(() => {
      isThrottled = false;
    }, delay);
  };
}
const throttleOnSearch = throttle(onSearch, 3000);

window.addEventListener("scroll", (event) => {
  throttleOnSearch(event, true);
});

function smoothScrollToTop() {
  const duration = 1000; // Duration in milliseconds
  const start = window.scrollY || window.pageYOf;
  const end = 0; // where to scroll back
  const change = end - start;
  let startTime = null;

  function animateScroll(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;

    const progress = Math.min(timeElapsed / duration, 1);

    window.scrollTo(end, start + change * progress);
    // console.log(timeElapsed); // logs the time elapsed since the start of the animation
    if (timeElapsed < duration) {
      requestAnimationFrame(animateScroll);
    }
    backToTopBtn.classList.add("hidden");
  }

  requestAnimationFrame(animateScroll);
}

backToTopBtn.addEventListener("click", smoothScrollToTop);
