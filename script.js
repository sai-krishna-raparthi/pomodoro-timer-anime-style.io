let focusButton = document.getElementById("focus");
let buttons = document.querySelectorAll(".btn");
let shortBreakButton = document.getElementById("shortbreak");
let longBreakButton = document.getElementById("longbreak");
let startBtn = document.getElementById("btn-start");
let reset = document.getElementById("btn-reset");
let pause = document.getElementById("btn-pause");
let time = document.getElementById("time");
let set;
let active = "focus";
let count = 59;
let paused = true;
let minCount = 24;
time.textContent = `${minCount + 1}:00`;
// Get a reference to the checkbox element by its ID
const checkbox = document.getElementById('notification-checkbox');

// Create a variable to store the checked value
let isChecked = checkbox.checked;
checkbox.addEventListener('change', function () {
  isChecked = this.checked; // Update the variable when the checkbox changes
  // console.log(isChecked); // Log the current state
});

const appendZero = (value) => {
  value = value < 10 ? `0${value}` : value;
  return value;
};
// console.log(active);
reset.addEventListener(
  "click",
  (resetTime = () => {
    pauseTimer();
    switch (active) {
      case "short":
        minCount = 4;
        break;
      case "long":
        minCount = 14;
        break;
      default:
        minCount = 24;
        break;
    }
    count = 59;
    console.log(minCount);
    time.textContent = `${minCount + 1}:00`;
  })
);

const removeFocus = () => {
  buttons.forEach((btn) => {
    btn.classList.remove("btn-focus");
  });
};

focusButton.addEventListener("click", () => {
  active = "focus";
  removeFocus();
  focusButton.classList.add("btn-focus");
   pauseTimer ();
  minCount = 24;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

shortBreakButton.addEventListener("click", () => {
  active = "short";
  removeFocus();
  shortBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 4;
  count = 59;
  time.textContent = `${appendZero(minCount + 1)}:00`;
});

longBreakButton.addEventListener("click", () => {
  active = "long";
  removeFocus();
  longBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 14;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

pause.addEventListener(
  "click",
  (pauseTimer = () => {
    paused = true;
    clearInterval(set);
    startBtn.classList.remove("hide");
    pause.classList.remove("show");
    reset.classList.remove("show");
  })
);

startBtn.addEventListener("click", () => {
  reset.classList.add("show");
  pause.classList.add("show");
  startBtn.classList.add("hide");
  startBtn.classList.remove("show");
  // console.log(minCount);

  if (paused) {
    paused = false;
    time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
    set = setInterval(() => {
      count--;
      time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
      if (count == 0) {
        if (minCount != 0) {
          minCount--;
          count = 60;
        } else {
          if (minCount === 0 && count === 0) {
            clearInterval(set);
            pause.classList.remove("show");
            // Display the notification when the timer reaches 00:00
            enableNotifications(isChecked);
        }
      }}
    }, 1000);
  }
});

function enableNotifications(isChecked){
if(isChecked){
if ("Notification" in window) {
    // Check if the browser supports the Notification API
    // Request permission to show notifications
    Notification.requestPermission()
      .then(function(permission) {
        if (permission === "granted") {
          // Permission to show notifications has been granted
          const notification = new Notification("Timer Expired", {
            body: "The timer has reached 00:00.",
          });
          
          notification.addEventListener("click", function openWebPage() {
            // Handle notification click event (e.g., open a new page, perform an action, etc.)
          });
          // You can also specify additional properties like icon, image, etc.
        } else if (permission === "denied") {
          // Permission has been denied
          console.log("Notification permission has been denied.");
        } else {
          // Permission request was dismissed by the user
          console.log("Notification permission request dismissed.");
        }
      });
  }
}
}