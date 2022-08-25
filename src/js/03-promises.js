import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formRef = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
function onFormSubmit(event) {
  event.preventDefault();
  let position = 0;
  let amount = Number(event.currentTarget.elements.amount.value);
  let delay = Number(event.currentTarget.elements.delay.value);
  let delayStep = Number(event.currentTarget.elements.step.value);
  for (let i = 1; i <= amount; i += 1) {
    position = i;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.info(`✅ Fulfilled promise ${position} in ${delay}ms`, {
          backOverlay: true,
          backOverlayColor: 'rgba(255, 85, 73, 0.2)',
          fontSize: '18px',
          timeout: 5000,
          clickToClose: true,
          position: 'center-top',
        });
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
          backOverlay: true,
          backOverlayColor: 'rgba(255, 85, 73, 0.2)',
          fontSize: '18px',
          timeout: 5000,
          clickToClose: true,
          position: 'center-top',
        });
      });
    delay += delayStep;
  }
}

formRef.addEventListener('submit', onFormSubmit);
