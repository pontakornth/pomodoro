<template>
  <div class="task-manager">
    <form class="task-menu">
       <label for="name">Task Name</label>
       <input type="text" name="name" placeholder="Programming..."/>
       <label for="pomodoroAmount">Amount of pomodoro estimated</label>
       <input type="number" name="pomodoroAmount" placeholder="1" />
    </form>
    <div class="task-list">
       <div class="task-item">
         <h3>Programming</h3>
         <p>1</p>
       </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskManager',
};
</script>
