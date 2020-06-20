<template>
  <div id="app">
    <h1>Pomodoro Timer</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';

@Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {}
</script>

<style lang="postcss">
#app {
  @apply flex justify-center items-center min-h-screen bg-green-400 text-gray-300;
}
</style>
