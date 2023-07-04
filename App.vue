<template>
  <div id="app">
    <div id="logo-container">
    </div>
    <div id="split-pane">
      <div id="task-pane">
        <input v-model="taskInput" type="text" placeholder="Add new task">
        <button @click="addTask">Add Task</button>
        <ul>
          <li v-for="(task, index) in tasks" :key="index">
            <input type="checkbox" @change="completeTask" :id="'task-'+index">
            <label :for="'task-'+index">{{ task }}</label>
          </li>
        </ul>
      </div>
      <div id="comment-pane">
        <p>Hey! you haven't finished your task yet! Finish them then you can get food or sleep dumbass BIIIIIIIITTTCCCCHHHH!</p>
      </div>
    </div>
    <div id="wotd">
      On the keyboard. U and I are next to each other... But under that there's also J and K. LOL Sad Fuck!
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskInput: '',
      tasks: [],
    };
  },
  methods: {
    addTask() {
      if (this.taskInput) {
        this.tasks.push(this.taskInput);
        this.taskInput = '';
      }
    },
    completeTask() {
      alert('Ha, you just finished a task! You no life loser ;)');
    }
  },
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

