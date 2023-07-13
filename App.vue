<template>
  <div id="app" class="container">
    <div class="navbar">
      <div class="navbar-item"><h1>TaskManager XP</h1></div>
      <div class="navbar-item" id="wotd">{{ jokeOfTheDay }}</div>
    </div>
    <div class="content">
      <p class="comment">Hey! You haven't finished your tasks yet! Finish them, then you can get food or sleep.</p>
      <div class="sidebar">
        <div class="sidebar-item">
          <input v-model="taskInput" type="text" placeholder="Add new task">
          <button @click="addTask">Add Task</button>
        </div>
        <div class="sidebar-item" id="download-tasks">
          <button @click="downloadTasks">Download Tasks</button>
        </div>
      </div>
      <div class="main">
        <div v-if="showEditModal" class="modal">
          <div class="modal-content">
            <h2 class="modal-title">Edit Task</h2>
            <form @submit.prevent="updateTask" class="edit-form">
              <div class="form-group">
                <label for="editTaskDescription">Task Name:</label>
                <input id="editTaskDescription" v-model="editedTask.description" type="text" required>
              </div>
              <div class="form-group">
                <label for="editTaskDateStart">Date and Time Start:</label>
                <input id="editTaskDateStart" v-model="editedTask.dateStart" type="text" required>
              </div>
              <div class="form-group">
                <label for="editTaskDateCompleted">Date and Time Completed:</label>
                <input id="editTaskDateCompleted" v-model="editedTask.dateCompleted" type="text" required>
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
                <td>{{ task.dateStart }}</td>
                <td>{{ formatDate(task.date, task.time) }}</td>
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
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios';
import { exportObjectAsCSV } from './utils';

export default defineComponent({
  name: 'App',
  data() {
    return {
      jokeOfTheDay: '',
      tasks: [],
      taskInput: '',
      showEditModal: false,
      editedTask: {
        index: null,
        description: '',
        dateStart: '',
        dateCompleted: ''
      }
    };
  },
  created() {
    this.getJokeOfTheDay();
    this.getTasks();
  },
  methods: {
    async getJokeOfTheDay() {
      try {
        const response = await axios.get('https://api.jokeapi.dev/jokes/random');
        this.jokeOfTheDay = response.data.joke;
      } catch (error) {
        console.error(error);
      }
    },
    async getTasks() {
      try {
        const response = await axios.get('/api/tasks');
        this.tasks = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    addTask() {
      if (!this.taskInput) return;
      this.tasks.push({ 
        description: this.taskInput, 
        status: 'ongoing',
        dateStart: this.getCurrentDateTime(),
        dateCompleted: ''
      });
      this.taskInput = '';
    },
    completeTask(index) {
      this.tasks[index].status = this.tasks[index].status === 'finished' ? 'ongoing' : 'finished';
      if(this.tasks[index].status === 'finished') {
        this.tasks[index].dateCompleted = this.getCurrentDateTime();
      }
    },
    editTask(index) {
      this.editedTask = {
        index: index,
        description: this.tasks[index].description,
        dateStart: this.tasks[index].dateStart,
        dateCompleted: this.tasks[index].dateCompleted
      };
      this.showEditModal = true;
    },
    updateTask() {
      const { index, ...task } = this.editedTask;
      this.tasks[index] = task;
      this.showEditModal = false;
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
    downloadTasks() {
      exportObjectAsCSV(this.tasks, 'tasks.csv');
    },
    cancelEdit() {
      this.showEditModal = false;
    },
    getCurrentDateTime() {
      let currentdate = new Date(); 
      let datetime = currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
      return datetime;
    }
  }
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
  --blue-xp: #0A59C1;
  --green-xp: #7BA428;
  --silver-xp: #C0C0C0;
  --white-xp: #FFFFFF;
  --black-xp: #000000;
}

body {
  font-family: 'Tahoma', sans-serif;
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

.content {
  display

