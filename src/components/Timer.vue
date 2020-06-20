<template>
  <div class="timer">
    <div class="tabs">
      <button class="tab-button">Work</button>
      <button class="tab-button">Short Break</button>
      <button class="tab-button">Long Break</button>
    </div>
    <h1>Work</h1>
    <h2>25:00</h2>
    <button class="timer-button">START</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Timer extends Vue {

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
