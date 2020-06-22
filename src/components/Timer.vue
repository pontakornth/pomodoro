<template>
  <div class="timer">
    <div class="tabs">
      <button class="tab-button">Work</button>
      <button class="tab-button">Short Break</button>
      <button class="tab-button">Long Break</button>
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
.timer-button {
  @apply bg-gray-100 text-green-600 p-2 px-8 rounded-full;
}
</style>
