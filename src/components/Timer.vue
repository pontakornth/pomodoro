<template>
  <div class="timer">
    <div class="tabs">
      <button @click="changeMode(0)" :disabled="isStarted" class="tab-button">Work</button>
      <button @click="changeMode(1)" :disabled="isStarted" class="tab-button">Short Break</button>
      <button @click="changeMode(2)" :disabled="isStarted" class="tab-button">Long Break</button>
    </div>
    <h1>Work</h1>
    <h2 class="time">{{minutes}}:{{seconds}}</h2>
    <button @click="timerStart" class="timer-button">{{actionButton}}</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Timer extends Vue {
  isStarted: boolean = false;

  timeLeft: number = 25 * 60 ;

  timer: number | undefined = undefined;

  changeMode(mode: number): void {
    if (mode === 0) {
      this.timeLeft = 25 * 60;
    } else if (mode === 1) {
      this.timeLeft = 5 * 60;
    } else if (mode === 2) {
      this.timeLeft = 15 * 60;
    }
  }

  timerStart(): void {
    if (this.isStarted) {
      clearInterval(this.timer);
      this.isStarted = !this.isStarted;
      return;
    }
    this.isStarted = !this.isStarted;
    this.timer = setInterval(() => {
      if (this.timeLeft <= 0) {
        clearInterval(this.timer);
        this.isStarted = false;
        return;
      }
      this.timeLeft -= 1;
    }, 1000);
  }

  get actionButton(): string {
    return this.isStarted ? 'STOP' : 'START';
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
