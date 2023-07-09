<template>
  <div id="app">
    <h1 class="header">Tasks</h1>
    <p class="comment">Hey! You haven't finished your tasks yet! Finish them, then you can get food or sleep.</p>
    <div class="add-task">
      <input v-model="taskInput" type="text" placeholder="Add new task">
      <button @click="addTask">Add Task</button>
    </div>
    <div class="ad-zone">
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4695954536473698"
        crossorigin="anonymous"></script>
    </div>
    <table>
      <thead>
        <tr>
          <th>Task Name</th>
          <th>Status</th>
          <th>Date and Time Start</th>
          <th>Date and Time Completed</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="index">
          <td>{{ task.description }}</td>
          <td>
            <input type="checkbox" @change="completeTask(index)" :checked="task.status === 'finished'">
            <span v-if="task.status === 'finished'">✓</span>
          </td>
          <td>{{ task.dateStart }}</td>
          <td>{{ task.date }} {{ task.time }}</td>
          <td>
            <button @click="editTask(index)">Edit</button>
          </td>
          <td>
            <button @click="deleteTask(index)">-</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="downloadTasks">Download Tasks</button>
    <p id="wotd">On the keyboard. U and I are next to each other... But under that there's also J and K. LOL!</p>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { exportObjectAsCSV } from './utils';

export default defineComponent({
  data() {
    return {
      taskInput: '',
      tasks: []
    };
  },
  created() {
    // Retrieve tasks from cookies
    const tasks = this.$cookies.get('tasks');
    if (tasks) {
      this.tasks = tasks;
    } else {
      // Add the "Test 1" task if the tasks array is empty
      this.tasks.push({
        description: 'Test 1',
        status: 'unfinished',
        dateStart: '',
        date: '',
        time: ''
      });
    }
  },
  methods: {
    addTask() {
      if (this.taskInput) {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();
        const formattedTime = currentDate.toLocaleTimeString();

        this.tasks.push({
        description: this.taskInput,
        status: 'unfinished',
        dateStart: formattedDate + ' ' + formattedTime,
        date: '',
        time: ''
      });
      this.taskInput = '';

      // Save tasks to cookies
      this.$cookies.set('tasks', this.tasks);
      } 
    },
    completeTask(index) {
      const task = this.tasks[index];
      if (task.status === 'unfinished') {
        alert('You just finished a task. Nice! Take a break and continue or you can rest/sleep ;)');
        task.status = 'finished';
        task.date = new Date().toLocaleDateString();
        task.time = new Date().toLocaleTimeString();
      } else {
        alert('The task is marked as unfinished. Keep going!');
        task.status = 'unfinished';
        task.date = '';
        task.time = '';
      }
      // Save tasks to cookies
      this.$cookies.set('tasks', this.tasks);
    },
    editTask(index) {
      const task = this.tasks[index];
      const newTaskDescription = prompt('Enter the new task name', task.description);
      const newDateStart = prompt('Enter the new date and time start (YYYY-MM-DD HH:MM)', task.dateStart);
      const newDateCompleted = prompt('Enter the new date and time completed (YYYY-MM-DD HH:MM)', task.date + ' ' + task.time);

      if (newTaskDescription !== null && newDateStart !== null && newDateCompleted !== null) {
        task.description = newTaskDescription;
        task.dateStart = newDateStart;
        const [newDate, newTime] = newDateCompleted.split(' ');
        task.date = newDate;
        task.time = newTime;

        // Save tasks to cookies
        this.$cookies.set('tasks', this.tasks);
      }
    },
    downloadTasks() {
      const content = this.tasks.map(task => ({
        ['Task Name']: task.description,
        ['Status']: task.status,
        ['Date and Time Completed']: task.date + ' ' + task.time
      }));

      exportObjectAsCSV(content, 'My Tasks', { keysAsHeader: true });
    },
    deleteTask(index) {
      const confirmation = window.confirm("Are you sure you want to delete this? Don't cry to me if you messed up");
      if (confirmation) {
        this.tasks.splice(index, 1);
        // Save tasks to cookies
        this.$cookies.set('tasks', this.tasks);
      }
    },
  },
});
</script>

<style>
#app {
  text-align: center;
  background-color: #C6CCD1;
  color: #0B333B;
}

.header {
  background-color: #0000FF; /* Change to the exact blue you want */
  color: #FFFFFF;
  padding: 10px;
  border: 2px solid #C0C0C0;
  border-radius: 5px;  /* Optional: Rounds the corners of the header */
  text-shadow: 1px 1px #C0C0C0;  /* Optional: Gives the text a silver shadow */
}

body {
  background-color: #C6CCD1;
  color: #0B333B;
  font-family: 'Courier New', Courier, monospace;
}

.comment {
  color: #0B333B;
  font-style: italic;
}

.add-task,
.ad-zone {
  background-color: #F4FAFF;
  border: 2px solid #0B333B;
  padding: 10px;
  margin: 10px;
}

#wotd {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #0B333B;
  color: #B7E0F2;
  padding: 10px;
}

table {
  margin: 0 auto;
  border-collapse: collapse;
  width: 90%;
}

th,
td {
  padding: 8px;
  border: 1px solid #0B333B;
  background-color: #F4FAFF;
}

input[type="text"],
button {
  border: 1px solid #0B333B;
  padding: 10px;
  color: #0B333B;
  background-color: #F4FAFF;
}

button {
  padding: 10px;
  margin: 10px 0;
  background-color: #0B333B;
  border: none;
  color: #F4FAFF;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
  background-color: #092227;
}
</style>

