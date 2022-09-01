const progressBar = document.querySelector(".circular-progress");
const valueInput = document.querySelector("#value__input");
const animateSwitch = document.querySelector("#animate__switch");
const hideSwitch = document.querySelector("#hide__switch");

let progressValue = 0;
let progressEndValue = 100;
let toggled = false;

const increaseValueByOne = () => {
    progressValue++;
    progressBar.style.background = `conic-gradient(
          #015afb ${progressValue * 3.6}deg,
          #eef2f5 ${progressValue * 3.6}deg
      )`;
};

const setValue = (e, speed) => {
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
};

const toggleAnimate = (speed) => {
    const progress = setInterval(() => {
        if (!toggled) {
            clearInterval(progress);
        }
        if (progressValue >= progressEndValue && toggled === true) {
            clearInterval(progress);
            progressValue = 0;
            toggleAnimate(speed);
        }
        valueInput.value = progressValue;
        increaseValueByOne();
    }, speed);
};

const toggleHide = () => {
	if (progressBar.style.visibility === "hidden") {
        progressBar.style.visibility = "visible";
        valueInput.disabled = false;
        animateSwitch.disabled = false;
    } else {
        progressBar.style.visibility = "hidden";
        valueInput.disabled = true;
        animateSwitch.disabled = true;
    }
};

valueInput.addEventListener("change", (e) => {
    setValue(e, 15);
});

animateSwitch.addEventListener("click", () => {
    toggled = !toggled;
    toggleAnimate(15);
});

hideSwitch.addEventListener("click", toggleHide);
