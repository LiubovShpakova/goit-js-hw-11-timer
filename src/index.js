import './styles.css';
// import flatpickr from 'flatpickr';
// require('../node_modules/flatpickr/dist/themes/dark.css');

// const myInput = document.getElementById('.myInput');

// const fp = flatpickr(myInput, { enableTime: true, dateFormat: 'Y-m-d H:i' });
// const ref = {
//   btnStart: document.querySelector('.btnStart'),
//   btnStop: document.querySelector('.btnStop'),
// };
// ref.btnStart.addEventListener('click', timer.start.bind(timer));
// ref.btnStop.addEventListener('click', timer.stop.bind(timer));

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.template = `<div class="field">
        <span class="value" data-value="days">0</span>
        <span class="label">Days</span>
      </div>
      <div class="field">
        <span class="value" data-value="hours">0</span>
        <span class="label">Hours</span>
      </div>
      <div class="field">
        <span class="value" data-value="mins">0</span>
        <span class="label">Minutes</span>
      </div>
      <div class="field">
        <span class="value" data-value="secs">0</span>
        <span class="label">Seconds</span>
      </div>`;
    this.selector = selector;
    this.root = document.querySelector(this.selector);
    this.targetDate = targetDate;
    this.root.insertAdjacentHTML('beforeend', this.template);
    this.refs = {
      days: this.root.querySelector("[data-value='days']"),
      hours: this.root.querySelector("[data-value='hours']"),
      mins: this.root.querySelector("[data-value='mins']"),
      secs: this.root.querySelector("[data-value='secs']"),
    };
  }
  start() {
    const startTime = this.targetDate.getTime();
    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      this.updateClock(deltaTime);
    }, 1000);
  }
  updateClock(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    this.refs.days.textContent = `${days}`;
    this.refs.hours.textContent = `${hours}`;
    this.refs.mins.textContent = `${mins}`;
    this.refs.secs.textContent = `${secs}`;
  }
  pad(value) {
    return String(value).padStart(2, '0');
  }
}
const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Mar 1, 2021'), //myInput.value
});
timer.start();
