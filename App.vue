<template>
  <div id="app">
    <h1 class="header">Tasks</h1>
    <p class="comment1">Hey! You haven't finished your tasks yet! Finish them, then you can get food or sleep.</p>
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
    <p id="wotd">{{ jokeOfTheDay }}</p>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { exportObjectAsCSV } from './utils';

export default defineComponent({
  data() {
    return {
      taskInput: '',
      tasks: [],
      insults: [
        'You finally managed to finish this task. Congrats, genius!',
        'Wow, you did it. Do you want a cookie now?',
        'Took you long enough...',
        'Even a sloth could have finished this task faster.',
        'You finished the task. What do you want, a medal?'
        // Add as many more insults as you want
      ],
      jokesOfTheDay: [
        "You complete tasks as fast as your dating life moves... at a snail's pace.",
        "Is your love life as disorganized as your task list? No wonder you're single!",
        "You know, finishing a task is a lot like a relationship - both are hard for you to maintain.",
        "Your commitment to finishing tasks is like your commitment to relationships... Oh wait, there isn't any.",
        "I bet even your imaginary girlfriend gets more attention than your task list.",
        "Your relationship status may be 'single', but your task list screams 'it's complicated'.",
        "On the keyboard. U and I are next to each other... But under that there's also J and K. LOL Sad Fuck!",
        //... add as many as you want
      ],
      jokeOfTheDay: '',
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
    
    // Update wotd with a new joke
    this.setJoke();
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
        task.status = 'finished';
        task.date = new Date().toLocaleDateString();
        task.time = new Date().toLocaleTimeString();

        // Generate and show an insult
        const insultIndex = Math.floor(Math.random() * this.insults.length);
        alert(this.insults[insultIndex]);
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
    setJoke() {
      const randomIndex = Math.floor(Math.random() * this.jokesOfTheDay.length);
      this.jokeOfTheDay = this.jokesOfTheDay[randomIndex];
    },
  },
});
</script>

<style>

@font-face {
  font-family: 'Forced Square';
  src: url('FORCED SQUARE.ttf') format('truetype');
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #C6CCD1;
  color: #0B333B;
  font-family: 'Forced Square', sans-serif; /* Add this line */
}

.header {
  background-color: #0000FF; /* Change to the exact blue you want */
  color: #FFFFFF;
  padding: 10px;
  border: 2px solid #C0C0C0;
  border-radius: 5px;  /* Optional: Rounds the corners of the header */
  text-shadow: 1px 1px #C0C0C0;  /* Optional: Gives the text a silver shadow */
  font-size: 42px
}

body {
  background-color: #ECE9D6; /* Light gray - close approximation to Emily is Away messenger app background color */
  color: #0B333B;
  font-family: 'Forced Square', sans-serif;
  font-size: 26px;
}

.comment1 {
  color: #000000; /* Black text */
  background-color: #FFFF00; /* Yellow background */
  padding: 16px;
  font-weight: bold; /* Make the text bold */
}

.add-task,
.ad-zone {
  background-color: #F4FAFF;
  border: 2px solid #0B333B;
  padding: 10px;
  margin: 10px;
}

#wotd {
  color: #0B333B; /* The color of the text in Emily is Away */
  background-color: #F4FAFF; /* The color of the text background in Emily is Away */
  padding: 16px;
  border: 1px solid #0B333B;
  border-radius: 5px;
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

/* Responsive styles for small screens */
@media (max-width: 767px) {
  .container {
    padding: 10px;
  }

  h1 {
    font-size: 24px;
  }
}

/* Responsive styles for medium screens */
@media (min-width: 768px) and (max-width: 1023px) {
  .container {
    padding: 20px;
  }

  h1 {
    font-size: 26px;
  }
}

/* Responsive styles for large screens */
@media (min-width: 1024px) {
  .container {
    padding: 30px;
  }

  h1 {
    font-size: 28px;
  }
}

</style>

