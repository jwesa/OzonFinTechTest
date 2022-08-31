const progressBar = document.querySelector(".circular-progress");
const valueContainer = document.querySelector(".value-container");
const animateSwitch = document.querySelector("#animated-switch");
const valueInput = document.querySelector("#value-input");

let progressValue = 0;
let progressEndValue = 100;
let toggle = false;

function changeValue(e) {
    progressBar.style.background = `conic-gradient(
          #015afb ${e.target.value * 3.6}deg,
          #eef2f5 ${e.target.value * 3.6}deg
      )`;
	progressValue = e.target.value;
}

//можно написать функцию КОТОРАЯ добавила бы анимацию с 0 процентов, соответсвенно переписать тогл функцию чтобы принимала параметры
// старт 0 энд 100 

function toggleAnimate() {
    let progress = setInterval(() => {
        if (!toggle) {
            clearInterval(progress);
        }
        progressValue++;
        valueInput.value = progressValue;
        progressBar.style.background = `conic-gradient(
          #015afb ${progressValue * 3.6}deg,
          #eef2f5 ${progressValue * 3.6}deg
      )`;
        if (progressValue == progressEndValue && toggle === true) {
            clearInterval(progress);
            progressValue = 0;
            progressEndValue = 100;
            valueInput.value = progressValue;
            progressBar.style.background = `conic-gradient(
          #015afb ${progressValue * 3.6}deg,
          #eef2f5 ${progressValue * 3.6}deg)`;
            toggleAnimate();
        }
    }, 15);
}

animateSwitch.addEventListener("click", toggleAnimate);
animateSwitch.addEventListener("click", () => {
    toggle = !toggle;
});

valueInput.addEventListener("change", changeValue);
