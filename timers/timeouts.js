/** -------------------------------------------------------------------------------- **
 ** --------------------------setTimeout(), clearTimeout()-------------------------- **
 ** -------------------------------------------------------------------------------- **/

"use strict";

/** ----------------------------------setTimeout()---------------------------------- **/

// The setTimeout function is used to run a function after a specified number of milliseconds.
// The setTimeout function returns a unique identifier (id) for the timeout.

/**
 * Function to show a notification message.
 * Add a new div element with the notification message to the notifications container.
 * If the hide flag is true, the notification will be hidden after the delay.
 *
 */
function createNotification({
  message = "I am default msg",
  hide = true,
  delay = 3000,
}) {
  const notificationsContainer = document.querySelector(".notifications");
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.classList.add("notification");
  notificationsContainer.appendChild(notification);

  if (hide) {
    setTimeout(function () {
      notification.remove();
    }, delay);
  }
}

function createNotificationWithInterval(intervalDelay) {
  let index = 0;
  let intervalId;
  let isRunning = false;
  return {
    start(notifications) {
      if (isRunning) {
        return;
      }
      isRunning = true;
      intervalId = setInterval(function () {
        console.log(`interval - index: ${index}`);
        if (index >= notifications.length) {
          isRunning = false;
          clearInterval(intervalId);
          index = 0;
          return;
        }
        createNotification(notifications.at(index));
        index++;
      }, intervalDelay);
    },
    stop() {
      clearInterval(intervalId);
      index = 0;
      isRunning = false;
    },

    isRunning() {
      return isRunning;
    },
  };
}

const notifications = [
  { message: "I will disappear in 3 seconds", hide: true, delay: 3000 },
  { message: "I will disappear in 5 seconds ", hide: true, delay: 5000 },
  { message: "I will disappear in 7 seconds", hide: true, delay: 7000 },
  { message: "I will disappear in 2 seconds", hide: true, delay: 2000 },
  { message: "I will not disappear", hide: false, delay: 4000 },
];

const showNotifications = createNotificationWithInterval(2000);

const showNotificationBtn = document.querySelector(
  ".menu__button_option_show-notifications"
);
const notificationsContainer = document.querySelector(".notifications");

showNotificationBtn.addEventListener("click", function () {
  if (showNotifications.isRunning()) {
    showNotifications.stop();
    notificationsContainer.classList.add("hidden");
    showNotificationBtn.innerText = "Show Notifications";
    return;
  }
  notificationsContainer.classList.remove("hidden");
  showNotifications.start(notifications);
  showNotificationBtn.innerText = "Hide Notifications";
});
