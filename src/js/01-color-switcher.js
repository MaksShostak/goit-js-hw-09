const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const onButtonStart = function ({ target }) {
  timerId = setInterval(() => {
    target.parentNode.style.backgroundColor = getRandomHexColor();
  }, 1000);
  target.disabled = true;
  buttonStop.disabled = false;
};

const onButtonStop = function ({ target }) {
  clearInterval(timerId);
  buttonStart.disabled = false;
  target.disabled = true;
};

buttonStop.addEventListener('click', onButtonStop);
buttonStart.addEventListener('click', onButtonStart);
