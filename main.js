class Timer {
  constructor(root) {
    this.el = {
      minutes: root.querySelector('.timer_minutes'),
      seconds: root.querySelector('.timer_seconds'),
      control: root.querySelector('.button_play'),
      reset: root.querySelector('#button_timer'),
    };

    this.interval = null;
    this.remainingSeconds = 0;

    this.el.reset.addEventListener('click', () => {
      const inputMinutes = prompt('Enter number of minutes:');

      if (inputMinutes < 60) {
        this.stop();
        this.remainingSeconds = inputMinutes * 60;
      }
      this.updateInterfaceTime();
    });

    this.el.control.addEventListener('click', () => this.startTimer());
  }

  updateInterfaceTime() {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;

    this.el.minutes.textContent = minutes.toString().padStart(2, '0');
    this.el.seconds.textContent = seconds.toString().padStart(2, '0');
  }

  startTimer() {
    if (this.interval === null) {
      this.start();
    } else {
      this.stop();
    }
  }

  updateInterfaceControls() {
    if (this.interval === null) {
      this.el.control.innerHTML = `<img src="/src/play_arrow_black_24dp.svg" alt="play" />`;
      this.el.control.classList.add('button_play');
      this.el.control.classList.remove('button_stop');
    } else {
      this.el.control.innerHTML = `<img src="/src/pause_black_24dp.svg" alt="pause" />`;
      this.el.control.classList.add('button_stop');
      this.el.control.classList.remove('button_play');
    }
  }

  start() {
    if (this.remainingSeconds === 0) return;

    this.interval = setInterval(() => {
      this.remainingSeconds--;
      this.updateInterfaceTime();

      if (this.remainingSeconds === 0) {
        this.stop();
      }
    }, 1000);

    this.updateInterfaceControls();
  }

  stop() {
    clearInterval(this.interval);

    this.interval = null;

    this.updateInterfaceControls();
  }

  /*
  static getHTML() {
    return `
    <span class="timer_minutes">00</span>
    <span class="timer_comma">:</span>
    <span class="timer_seconds">00</span>
    <button class="button button_play">
      <img src="/src/play_arrow_black_24dp.svg" alt="play" />
    </button>
    <button class="button button_timer">
      <img src="/src/timer_black_24dp.svg" alt="" />
    </button>
		`;
  }
  */
}

new Timer(document.querySelector('.timer'));
