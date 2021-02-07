import './styles.css';
import flatpickr from 'flatpickr';
require('../node_modules/flatpickr/dist/themes/dark.css');

const myInput = document.getElementById('myInput');

const fp = flatpickr(myInput, { enableTime: true, dateFormat: 'Y-m-d H:i' });

const ref = {
  btnStart: document.querySelector('.btnStart'),
  btnStop: document.querySelector('.btnStop'),
};
class CountdownTimer {
  constructor({ selector }) {
    this.selector = selector;
    this.root = document.querySelector(this.selector);
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

    this.root.insertAdjacentHTML('beforeend', this.template);
    this.interval = null;
    this.refs = {
      days: this.root.querySelector("[data-value='days']"),
      hours: this.root.querySelector("[data-value='hours']"),
      mins: this.root.querySelector("[data-value='mins']"),
      secs: this.root.querySelector("[data-value='secs']"),
    };
  }
  start() {
    const startTime = fp.selectedDates[0];
    if (startTime) {
      ref.btnStart.disabled = true;
      this.interval = setInterval(() => {
        const currentTime = Date.now();
        // console.log(currentTime);
        const deltaTime = startTime - currentTime;
        this.updateClock(deltaTime);
      }, 1000);
    }
  }
  stop() {
    clearInterval(this.interval);
    fp.clear();
    ref.btnStart.disabled = false;
    this.refs.days.textContent = `${0}`;
    this.refs.hours.textContent = `${0}`;
    this.refs.mins.textContent = `${0}`;
    this.refs.secs.textContent = `${0}`;
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
});
ref.btnStart.addEventListener('click', timer.start.bind(timer));
ref.btnStop.addEventListener('click', timer.stop.bind(timer));
