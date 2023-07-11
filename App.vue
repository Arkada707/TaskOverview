<template>
  <div id="app">
    <div id="header">
      <h1>Task</h1>
    </div>
    <div id="comment1" class="comment">Comment1</div>
    <div id="task-input">
      <input v-model="taskInput" type="text" placeholder="Add new task">
      <button @click="addTask">Add Task</button>
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

#app {
  text-align: center;
  background-color: #ECE9D6; /* Light gray - close approximation to Emily is Away messenger app background color */
  color: #0B333B;
  font-family: 'Forced Square', sans-serif; /* Add this line */
  padding: 20px;
}

#header {
  background-color: #0000FF; /* Change to the exact blue you want */
  color: #FFFFFF;
  margin-bottom: 20px;
  border: 2px solid #C0C0C0;
  border-radius: 5px;  /* Optional: Rounds the corners of the header */
  text-shadow: 1px 1px #C0C0C0;  /* Optional: Gives the text a silver shadow */
  font-size: 42px
}

#comment1 {
  color: #000000; /* Black text */
  background-color: #FFFF00; /* Yellow background */
  margin-bottom: 20px;
  padding: 16px;
  font-weight: bold; /* Make the text bold */
}

#task-input {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

#task-input input[type="text"] {
  padding: 10px;
  margin-right: 10px;
}

#table-container {
  overflow-x: auto;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  border: 1px solid #0B333B;
  background-color: #F4FAFF;
}

#download-tasks {
  margin-bottom: 20px;
}

#wotd {
  color: #0B333B; /* The color of the text in Emily is Away */
  background-color: #F4FAFF; /* The color of the text background in Emily is Away */
  padding: 10px;
}
</style>