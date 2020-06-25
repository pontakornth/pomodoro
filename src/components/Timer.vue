<template>
  <div class="timer">
    <div class="tabs">
      <button
         @click="changeMode('work')"
         :disabled="timerState == 'running'"
         class="tab-button">
         Work
      </button>
      <button
          @click="changeMode('shortbreak')"
          :disabled="timerState == 'running'"
          class="tab-button">
          Short Break
      </button>
      <button
          @click="changeMode('longbreak')"
          :disabled="timerState == 'running'"
          class="tab-button">
          Long Break
      </button>
    </div>
    <h1>{{displayMode[timerMode]}}</h1>
    <h2 class="time">{{minutes}}:{{seconds}}</h2>
    <button @click="handleClick" class="timer-button">{{actionButton}}</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

type TimerState = 'stop' | 'start' | 'running';
type TimerMode = 'work' | 'shortbreak' | 'longbreak';

@Component
export default class Timer extends Vue {
  timerState: TimerState = 'start';

  timerMode: TimerMode = 'work';

  timeLeft: number = 25 * 60 ;

  timer: number | undefined = undefined;

  displayMode: object = {
    work: 'Work',
    shortbreak: 'Short Break',
    longbreak: 'Long Break',
  }

  changeMode(mode: TimerMode): void {
    if (mode === 'work') {
      this.timeLeft = 25 * 60;
    } else if (mode === 'shortbreak') {
      this.timeLeft = 5 * 60;
    } else if (mode === 'longbreak') {
      this.timeLeft = 15 * 60;
    }
    this.timerMode = mode;
  }

  triggerTimer(): void {
    if (this.timerState === 'running') {
      clearInterval(this.timer);
      this.timerState = 'start';
      return;
    }
    this.timerState = 'running';
    this.timer = setInterval(() => {
      if (this.timeLeft <= 0) {
        // eslint-disable-next-line global-require
        const alarmSrc = require('../assets/alarm.mp3');
        const alarm = new Audio(alarmSrc);
        alarm.play();
        clearInterval(this.timer);
        this.timerState = 'stop';
        return;
      }
      this.timeLeft -= 1;
    }, 1000);
  }

  handleClick(): void {
    if (this.timerState === 'stop') {
      this.resetTimer();
    } else {
      this.triggerTimer();
    }
  }

  resetTimer(): void {
    this.timerState = 'start';
    this.changeMode(this.timerMode);
  }

  get actionButton(): string {
    switch (this.timerState) {
      case 'start':
        return 'START';
      case 'stop':
        return 'RESET';
      default:
        return 'STOP';
    }
  }

  get minutes(): string {
    const minutes = Math.floor(this.timeLeft / 60);
    return minutes > 10 ? minutes.toString() : `0${minutes.toString()}`;
  }

  get seconds(): string {
    const seconds = this.timeLeft % 60;
    return seconds > 10 ? seconds.toString() : `0${seconds.toString()}`;
  }
}
</script>

<style lang="postcss" scoped>
.timer {
  @apply w-1/2 bg-green-500 text-gray-200 p-4 text-center;
}
.tab-button {
  @apply bg-green-400 text-gray-100 p-2 rounded-full mx-4;
}
.tab-button:disabled {
  cursor: not-allowed;
  @apply bg-green-300 text-gray-100;
}
.timer-button {
  @apply bg-gray-100 text-green-600 p-2 px-8 rounded-full;
}
</style>
