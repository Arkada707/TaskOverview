<template>
  <div id="app">
    <div id="header">
      <h1>Task</h1>
    </div>
    <p class="comment">Hey! You haven't finished your tasks yet! Finish them, then you can get food or sleep.</p>
    <div id="task-input">
      <input v-model="taskInput" type="text" placeholder="Add new task">
      <button @click="addTask">Add Task</button>
    </div>
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
    </div>
    <div id="download-tasks">
      <button @click="downloadTasks">Download Tasks</button>
    </div>
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
      showEditModal: false,
      editedTask: {
        index: null,
        description: '',
        dateStart: '',
        dateCompleted: ''
      },
      adsenseContent: '',
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
    //adsense Content
    this.adsenseContent = document.getElementById('divadsensedisplaynone').innerHTML
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
      this.editedTask = {
        index,
        description: task.description,
        dateStart: task.dateStart,
        dateCompleted: task.date + ' ' + task.time
      };
      this.showEditModal = true;
    },

    updateTask() {
      const task = this.tasks[this.editedTask.index];
      task.description = this.editedTask.description;
      task.dateStart = this.editedTask.dateStart;
      const [newDate, newTime] = this.editedTask.dateCompleted.split(' ');
      task.date = newDate;
      task.time = newTime;

      // Save tasks to cookies
      this.$cookies.set('tasks', this.tasks);

      this.showEditModal = false;
    },

    cancelEdit() {
      this.showEditModal = false;
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

body {
  background-color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  font-family: 'Forced Square', sans-serif;
  font-size: 18px;
  color: #FFFFFF;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  padding: 20px;
}

#header {
  background-color: #4474FF;
  color: #FFFFFF;
  padding: 12px;
  text-align: center;
  font-size: 28px;
}

.comment {
  background-color: #FFFF00;
  color: #000000;
  padding: 16px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 20px;
}

#task-input {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

#task-input input[type="text"] {
  padding: 12px;
  margin-right: 10px;
  font-size: 18px;
  border: 2px solid #4474FF;
  border-radius: 5px;
}

#task-input button {
  padding: 12px 20px;
  font-size: 18px;
  background-color: #4474FF;
  color: #FFFFFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

#task-input button:hover {
  background-color: #3355CC;
}

#table-container {
  overflow-x: auto;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 12px;
  border: 1px solid #000000;
  background-color: #FFFFFF;
  font-size: 18px;
}

table th {
  background-color: #4474FF;
  color: #FFFFFF;
  font-weight: bold;
  text-align: left;
}

td.completed {
  background-color: #C6E0B4;
}

td.completed span {
  color: #4CAF50;
}

td button {
  padding: 8px 16px;
  font-size: 16px;
  background-color: #FF3366;
  color: #FFFFFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

td button:hover {
  background-color: #FF0055;
}

#download-tasks {
  text-align: center;
}

#download-tasks button {
  padding: 12px 20px;
  font-size: 18px;
  background-color: #4474FF;
  color: #FFFFFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

#download-tasks button:hover {
  background-color: #3355CC;
}

#wotd {
  text-align: center;
  margin-top: 20px;
  padding: 12px;
  font-size: 24px;
  background-color: #FFFFFF;
  color: #000000;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.modal-content {
  background-color: #FFFFFF;
  padding: 20px;
  max-width: 400px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.modal-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 28px;
  color: #4474FF;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: bold;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
</style>
