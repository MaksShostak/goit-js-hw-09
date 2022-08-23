const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
buttonStop.addEventListener('click', onButtonStop);
buttonStart.addEventListener('click', onButtonStart);

// 1варіант

function backgroundColorBodyChange(target) {
  target.parentNode.style.backgroundColor = getRandomHexColor();
}

function onButtonStart({ target }) {
  timerId = setInterval(backgroundColorBodyChange, 1000, target);
  target.disabled = true;
  buttonStop.disabled = false;
}

function onButtonStop({ target }) {
  clearInterval(timerId);
  buttonStart.disabled = false;
  target.disabled = true;
  //   target.parentNode.removeAttribute('style');
}
// 2варіант

// function onButtonStart({ target }) {
//   timerId = setInterval(() => {
//     target.parentNode.style.backgroundColor = getRandomHexColor();
//   }, 1000);
//   target.disabled = true;
//   buttonStop.disabled = false;
// }

// function onButtonStop({ target }) {
//   clearInterval(timerId);
//   buttonStart.disabled = false;
//   target.disabled = true;
//   //   target.parentNode.removeAttribute('style');
// }
