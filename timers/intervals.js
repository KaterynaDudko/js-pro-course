/** -------------------------------------------------------------------------------- **
 ** -------------------------setInterval(), clearInterval()------------------------- **
 ** -------------------------------------------------------------------------------- **/

function getTimeTillSummer() {
  const summerDate = new Date("2024-06-01 00:00").getTime();
  const currentDate = new Date().getTime();
  const timeLeft = summerDate - currentDate;

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  console.log(
    `Days: ${days}, Hours: ${hours}, Minutes: ${minutes}, Seconds: ${seconds}`
  );

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

function showTimeTillSummer() {
  const { days, hours, minutes, seconds } = getTimeTillSummer();
  const countdown = document.querySelector(".countdown__message");
  countdown.textContent = `${days} ${
    (days === 1 && "day") || "days"
  }, ${hours} ${(hours === 1 && "hour") || "hours"}, ${minutes} ${
    (minutes === 1 && "minute") || "minutes"
  }, ${seconds} ${(seconds === 1 && "second") || "seconds"}!`;
}

function createSummerCountdown() {
  let ticks = 0;
  let intervalId;
  let isRunning = false;
  return {
    start() {
      if (isRunning) {
        return;
      }
      isRunning = true;
      intervalId = setInterval(function () {
        ticks++;
        showTimeTillSummer();
        if (ticks >= 100) {
          isRunning = false;
          ticks = 0;
          clearInterval(intervalId);
        }
      }, 1000);
    },
    stop() {
      ticks = 0;
      clearInterval(intervalId);
      isRunning = false;
    },
    isRunning() {
      return isRunning;
    },
  };
}

const summerCountdown = createSummerCountdown();

const summerCountdownEl = document.querySelector(".countdown");
const btnShowCountdown = document.querySelector(
  ".menu__button_option_show-countdown"
);

function hideCountdown() {
  summerCountdownEl.classList.add("hidden");
  btnShowCountdown.innerText = "Show countdown";
  summerCountdown.stop();
}

// simple debounce to prevent multiple clicks
let summerCountdownTimeout;

btnShowCountdown.addEventListener("click", function () {
  clearTimeout(summerCountdownTimeout);

  summerCountdownTimeout = setTimeout(() => {
    if (summerCountdown.isRunning()) {
      hideCountdown();
      return;
    }
    hideImageContainer();
    hideAnimationContainer();
    summerCountdownEl.classList.remove("hidden");
    btnShowCountdown.innerText = "Hide Countdown";
    summerCountdown.start();
  }, 400);
});
