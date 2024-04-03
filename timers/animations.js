/** -------------------------------------------------------------------------------- **
 ** -----------------------------RequestAnimationFrame------------------------------ **
 ** -------------------------------------------------------------------------------- **/

let animationFrameId;
let intervalAnimationId;

let intervalAngle = 0;
let animationFrameAngle = 0;
let previousTime;

const showAnimationBtn = document.querySelector(
  ".menu__button_option_show-animation"
);

const animationContainer = document.querySelector(".animated-boxes");

showAnimationBtn.addEventListener("click", () => {
  hideCountdown();
  hideImageContainer();
  if (animationContainer.classList.contains("hidden")) {
    showAnimationBtn.innerText = "Hide animation";
    animationContainer.classList.remove("hidden");
    // Start the animations
    intervalAnimationId = setInterval(animateWithInterval, 16); // 60 FPS (approximately)

    animationFrameId = requestAnimationFrame(animateWithAnimationFrame);
    return;
  }
  hideAnimationContainer();
});

function hideAnimationContainer() {
  animationContainer.classList.add("hidden");
  showAnimationBtn.innerText = "Show animation";
  cancelAnimationFrame(animationFrameId);
  clearInterval(intervalAnimationId);
  intervalAngle = 0;
  console.log(intervalAngle);
  animationFrameAngle = 0;
  previousTime = null;
}

const boxInterval = document.getElementById("boxInterval");
const boxAnimationFrame = document.getElementById("boxAnimationFrame");

function animateWithInterval() {
  boxInterval.style.transform = "rotate(" + intervalAngle + "deg)";
  intervalAngle += 2;
}

function animateWithAnimationFrame(currentTime) {
  //   console.log(currentTime - previousTime); // logs the time difference between the previous and current frame
  previousTime = currentTime;
  boxAnimationFrame.style.transform = "rotate(" + animationFrameAngle + "deg)";
  animationFrameAngle += 2;
  animationFrameId = requestAnimationFrame(animateWithAnimationFrame); // always passes the current time to the callback function
}
