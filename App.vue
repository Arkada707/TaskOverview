<template>
  <div id="app">
    <h1>Tasks</h1>
    <p class="comment">Hey! You haven't finished your tasks yet! Finish them, then you can get food or sleep, dumbass BIIIIIIIITTTCCCCHHHH!</p>
    <div class="add-task">
      <input v-model="taskInput" type="text" placeholder="Add new task">
      <button @click="addTask">Add Task</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Task Name</th>
          <th>Status</th>
          <th>Date and Time Completed</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="index">
          <td>{{ task.description }}</td>
          <td>
            <input type="checkbox" @change="completeTask(index)">
            <span v-if="task.status === 'finished'">✓</span>
          </td>
          <td>{{ task.date }} {{ task.time }}</td>
          <td>
            <button @click="deleteTask(index)">-</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="downloadTasks">Download Tasks</button>
    <p id="wotd">On the keyboard. U and I are next to each other... But under that there's also J and K. LOL Sad Fuck!</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskInput: '',
      tasks: [
        {
          description: 'Task1',
          status: 'unfinished',
          date: '',
          time: ''
        }
      ]
    };
  },
  methods: {
    addTask() {
      if (this.taskInput) {
        this.tasks.push({
          description: this.taskInput,
          status: 'unfinished',
          date: '',
          time: ''
        });
        this.taskInput = '';
      }
    },
    completeTask(index) {
      const task = this.tasks[index];
      if (task.status === 'unfinished') {
        alert('Ha! You just finished a task, you no life loser ;)');
        task.status = 'finished';
        task.date = new Date().toLocaleDateString();
        task.time = new Date().toLocaleTimeString();
      }
    },
    downloadTasks() {
      const content = 'Task Name\t\tStatus\t\tDate and Time Completed\n';
      this.tasks.forEach(task => {
        content += `${task.description}\t\t${task.status}\t\t${task.date} ${task.time}\n`;
      });
      this.downloadFile('tasks.txt', content);
    },
    deleteTask(index) {
      const confirmation = window.confirm("Are you sure you want to delete this? Don't cry to me if you messed up");
      if (confirmation) {
        this.tasks.splice(index, 1);
      }
    },
    downloadFile(filename, content) {
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
      element.setAttribute('download', filename);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  }
};
</script>

<style>
/* Add your CSS styles here */
#app {
  text-align: center;
}

#logo-container {
  padding: 20px 0;
}

#split-pane {
  display: flex;
  justify-content: space-around;
}

#task-pane {
  width: 45%;
}

#comment-pane {
  width: 45%;
  margin: 0 auto; /* Center the comment pane horizontally */
  position: absolute; /* Position it absolutely */
  top: 0; /* Place it at the top of the page */
}

#wotd {
  position: fixed;
  bottom: 0;
  width: 100%;
}

body {
    background-color: black;
    color: lime;
    font-family: Arial, sans-serif;
}

.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

table {
  margin: 0 auto;
  border-collapse: collapse;
  outline: 3px solid lime;
}

th,
td {
  padding: 8px;
  border: 2px solid lime;
}

#taskInput {
    width: 80%;
    padding: 10px;
    margin: 10px 0;
}

button {
    padding: 10px;
    margin: 10px 0;
    background-color: lime;
    border: none;
    color: black;
    cursor: pointer;
}

button:hover {
    opacity: 0.8;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin: 10px 0;
    padding: 10px;
    background-color: #333;
}

/* Add green boxes */
input[type="text"],
button {
    border: 2px solid lime;
    padding: 10px;
    background-color: black;
    color: lime;
}

</style>