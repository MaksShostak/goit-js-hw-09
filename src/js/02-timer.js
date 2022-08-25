// import convertMs from './function-convert-ms';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_green.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const daysValueRef = document.querySelector('[data-days]');
const hoursValueRef = document.querySelector('[data-hours]');
const minutesValueRef = document.querySelector('[data-minutes]');
const secondsValueRef = document.querySelector('[data-seconds]');
const buttonStartTimerRef = document.querySelector('button');

buttonStartTimerRef.disabled = true;
let selectedDate = 0;

// let intervalCounter = null;
// let isActive = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < options.defaultDate.getTime()) {
      // або Date.now()

      Notify.failure('Please choose a date in the future', {
        backOverlay: true,
        backOverlayColor: 'rgba(255, 85, 73, 0.2)',
        fontSize: '18px',
        timeout: 5000,
        clickToClose: true,
        position: 'center-top',
      });
    } else {
      buttonStartTimerRef.disabled = false;
      selectedDate = selectedDates[0].getTime();
    }
  },
};
flatpickr('#datetime-picker', options);

// function onButtonStartTimer() {
//   if (isActive) {
//     return;
//   }
//   isActive = true;
//   intervalCounter = setInterval(() => {
//     const currentTime = Date.now();
//     const counterTime = selectedDate - currentTime;
//     const convertCounterTime = convertMs(counterTime);
//     console.log(counterTime);
//     updateCounterface(convertCounterTime);
//     stopTimerInTheEnd(counterTime);
//   }, 1000);
// }

// function stopTimerInTheEnd(counterTime) {
//   if (counterTime < 999) {
//     clearInterval(intervalCounter);
//     isActive = false;
//   }
// }

class Timer {
  constructor({ onStartTimer }) {
    this.intervalCounter = null;
    this.isActive = false;
    this.onStartTimer = onStartTimer;
  }

  onButtonStartTimer() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    buttonStartTimerRef.disabled = true;
    this.intervalCounter = setInterval(() => {
      const currentTime = Date.now();
      const counterTime = selectedDate - currentTime;
      const convertCounterTime = this.convertMs(counterTime);
      this.onStartTimer(convertCounterTime);
      this.stopTimerInTheEnd(counterTime);
    }, 1000);
  }
  stopTimerInTheEnd(counterTime) {
    if (counterTime < 999) {
      clearInterval(this.intervalCounter);
      this.isActive = false;
    }
  }
  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    // Remaining seconds
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }
  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Timer({
  onStartTimer: updateCounterface,
});
buttonStartTimerRef.addEventListener(
  'click',
  timer.onButtonStartTimer.bind(timer)
);

function updateCounterface({ days, hours, minutes, seconds }) {
  daysValueRef.textContent = days;
  hoursValueRef.textContent = hours;
  minutesValueRef.textContent = minutes;
  secondsValueRef.textContent = seconds;
}
