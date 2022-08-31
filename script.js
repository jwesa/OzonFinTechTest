const progressBar = document.querySelector(".circular-progress");
const valueInput = document.querySelector("#value-input");
const animateSwitch = document.querySelector("#animated-switch");
const hideSwitch = document.querySelector("#hide-switch");

let progressValue = 0;
let progressEndValue = 100;
let toggle = false;

function increaseValueByOne() {
    progressValue++;
    progressBar.style.background = `conic-gradient(
          #015afb ${progressValue * 3.6}deg,
          #eef2f5 ${progressValue * 3.6}deg
      )`;
}

function setValue(e, speed) {
    if (e.target.value.match("^([1-9][0-9]?|100)$")) {
        if (e.target.value <= progressValue) {
            progressValue = 0;
        }
        const progress = setInterval(() => {
            increaseValueByOne();
            if (progressValue == e.target.value) {
                clearInterval(progress);
            }
        }, speed);
    }
}

function toggleAnimate(speed) {
    const progress = setInterval(() => {
        if (!toggle) {
            clearInterval(progress);
        }
        valueInput.value = progressValue;
        increaseValueByOne();
        if (progressValue >= progressEndValue && toggle === true) {
            clearInterval(progress);
            progressValue = 0;
            progressEndValue = 100;
            toggleAnimate(speed);
        }
    }, speed);
}

function toggleHide() {
	if (progressBar.className === "circular-progress__hidden") {
		progressBar.className = "circular-progress";
		valueInput.disabled = false;
    } else {
		progressBar.className = "circular-progress__hidden";
		valueInput.disabled = true;
    }
}

valueInput.addEventListener("change", (event) => {
	setValue(event, 15);
});

animateSwitch.addEventListener("click", () => {
    toggle = !toggle;
    toggleAnimate(15);
});

hideSwitch.addEventListener("click", toggleHide);

