<template>
  <div id="app" class="container">
    <div class="navbar">
      <div class="navbar-item"><h1>TaskManager XP</h1></div>
      <div class="navbar-item" id="wotd">{{ jokeOfTheDay }}</div>
    </div>
    <div class="sidebar">
      <div class="sidebar-item">
        <input type="text" v-model="newTaskDescription">
        <button @click="addTask">Add Task</button>
      </div>
      <div class="sidebar-item" id="download-tasks">
        <button @click="downloadTasksAsCSV">Download Tasks</button>
      </div>
    </div>
    <div class="main">
      <div v-if="task">
        {{ task.description }}
      </div>
        <div v-if="showEditModal" class="modal">
          <div class="modal-content">
            <h2 class="modal-title">Edit Task</h2>
            <form @submit.prevent="updateTask">
              <div class="form-group">
                <label for="editTaskDescription">Task Name:</label>
                <input type="text" id="editTaskDescription" name="editTaskDescription" v-model="editTaskDescription" required>
              </div>
              <div class="form-group">
                <label for="editTaskDateStart">Date and Time Start:</label>
                <input id="editTaskDateStart" v-model="editTask.dateStart" type="text" required>
              </div>
              <div class="form-group">
                <label for="editTaskDateCompleted">Date and Time Completed:</label>
                <input id="editTaskDateCompleted" v-model="editTask.dateCompleted" type="text" required>
              </div>
              <div class="modal-buttons">
                <button type="submit">Save</button>
                <button @click="cancelEdit">Cancel</button>
              </div>
            </form>
          </div>
        </div>
        <div id="table-container">
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
                <td>{{ task.startDate }}</td>
                <td>{{ task.completionDate }}</td>
                <td>
                  <button @click="editTask(index)">Edit</button>
                </td>
                <td>
                  <button @click="deleteTask(index)">-</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div id="footer">© 2023 TaskManager XP</div>
</template>


<script>
import { defineComponent } from 'vue';
import { exportObjectAsCSV } from './utils';

export default defineComponent({
  data() {
    return {
      newTaskDescription: '',
      tasks: [],
      completionInsults: [
        //...
        'You finally managed to finish this task. Congrats, genius!',
        'Wow, you did it. Do you want a cookie now?',
        'Took you long enough...',
        'Even a sloth could have finished this task faster.',
        'You finished the task. What do you want, a medal?'
        // Add as many more insults as you want
      ],
      dailyJokes: [
        //...
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
      taskBeingEdited: {
        index: null,
        description: '',
        startDate: '',
        completionDate: ''
      },
      showEditModal: false,
    };
  },
  created() {
    this.loadTasksFromStorage();
    this.setDailyJoke();
  },
  methods: {
    addTask() {
      if (!this.newTaskDescription.trim()) {
      alert('Task description cannot be empty');
      return;
      }
      var currentDate = new Date();
      var currentDateString = currentDate.toLocaleDateString() + " " + currentDate.toLocaleTimeString();

      var newTask = {
        "description": this.newTaskDescription, // Use this.newTaskDescription instead of getting the value from the DOM
        "status": 'unfinished', // Instead of "isCompleted", use "status" to match the other parts of your code
        "startDate": currentDateString, // Change "dateStart" to "startDate" to match your existing properties
        "completionDate": "Not yet completed" // Use an empty string for an unfinished task's completion date
      };

      this.tasks.push(newTask); // Use this.tasks instead of taskArray
      this.newTaskDescription = ''; // Clear the input field for the next task

      this.saveTasksToStorage(); // Save tasks to localStorage
    },
    completeTask(index) {
      const task = this.tasks[index];
  if (task.status === 'unfinished') {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    task.status = 'finished';
    task.completionDate = `${date} ${time}`;

    const randomInsult = this.completionInsults[Math.floor(Math.random() * this.completionInsults.length)];
    alert(randomInsult);
  } else {
    alert('The task is marked as unfinished. Keep going!');
    task.status = 'unfinished';
    task.completionDate = 'Not yet completed'; // Update the completionDate property
  }

  this.saveTasksToStorage();
    },
    editTask(index) {
      console.log('Selected task:', this.tasks[index]);
      if (this.tasks[index]) {
        this.taskBeingEdited = {
          index: index,
          description: this.tasks[index].description,
          startDate: this.tasks[index].startDate,
          completionDate: this.tasks[index].completionDate
        };
        this.showEditModal = true;
      } else {
        console.error('Task not found');
        // Handle the error appropriately
      }
    },
    updateTask() {
      const index = this.taskBeingEdited.index;
      const task = this.tasks[index];
      task.description = this.taskBeingEdited.description;
      task.startDate = this.taskBeingEdited.startDate;

      if (this.taskBeingEdited.completionDate) {
        const [date, time] = this.taskBeingEdited.completionDate.split(' ');
        task.completionDate = `${date} ${time}`;
      } else {
        task.completionDate = '';
      }

      this.saveTasksToStorage();
      this.showEditModal = false;
    },
    cancelEdit() {
      this.showEditModal = false;
    },
    downloadTasksAsCSV() {
      const tasksData = this.tasks.map(task => ({
        'Task Name': task.description,
        'Status': task.status,
        'Completion Date and Time': task.completionDate
      }));

      exportObjectAsCSV(tasksData, 'My Tasks', { keysAsHeader: true });
    },
    deleteTask(index) {
      const confirmation = window.confirm("Are you sure you want to delete this task?");
      if (confirmation) {
        this.tasks.splice(index, 1);
        this.saveTasksToStorage();
      }
    },
    setDailyJoke() {
      const randomJoke = this.dailyJokes[Math.floor(Math.random() * this.dailyJokes.length)];
      this.jokeOfTheDay = randomJoke;
    },
    loadTasksFromStorage() {
      try {
        const tasksJSON = localStorage.getItem('tasks');
        this.tasks = tasksJSON ? JSON.parse(tasksJSON) : [];
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    },
    addDefaultTask() {
      this.tasks.push({
        description: 'Test 1',
        status: 'unfinished',
        startDate: '',
        completionDate: ''
      });
    },
    saveTasksToStorage() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    formatDate(date, time) {
      return `${date} ${time}`;
    },
  },
});
</script>



<style>
/* Reset styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Define windows XP colors */
:root {
  --blue-xp: #00000000;
  --green-xp: #0035DB;
  --silver-xp: #C0C0C0;
  --white-xp: #FFFFFF;
  --black-xp: #000000;
}

body {
  font-family: 'Press Start 2P', cursive;
  background-color: var(--blue-xp);
  color: var(--black-xp);
}

/* Apply the styles according to the windows XP interface */
.container {
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "nav nav"
    "sidebar main"
    "footer footer";
  height: 100vh;
}

.navbar {
  grid-area: nav;
  background-color: var(--green-xp);
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
}

.navbar-item {
  color: var(--white-xp);
}

.sidebar {
  grid-area: sidebar;
  background-color: var(--silver-xp);
  padding: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

td, th {
  border: 1px solid #000;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #ddd;
}

.main {
  grid-area: main;
  background-color: var(--white-xp);
  padding: 10px;
}

button, input[type="text"] {
  font-family: 'Press Start 2P', cursive;
  background-color: #2785FF; /* Blue */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  height: 50px;
}

input[type="text"] {
  background-color: #FFFFFF;
  color: #000000;
}

button:hover {
  background-color: #45a049;
}

.modal {
  display: block; /* Hidden by default; set to block to show it */
  position: fixed; /* Stay in place */
  z-index: 100; /* Higher than other elements */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  margin: auto;
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Semi-transparent black */
}

.modal-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #FFFFFF;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

.modal-content input[type="text"] {
  border: 1px solid #000000; /* Black border */
  /* Additional styles for padding and margin can be added here */
  padding: 4px; /* Example padding */
  margin-top: 2px; /* Example margin */
}

.footer {
  grid-area: footer;
  background-color: var(--black-xp);
  color: var(--white-xp);
  padding: 10px;
}

</style>
