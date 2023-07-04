<template>
  <div class="login-container">
    <h1>Welcome to Vue</h1>
    <div class="input-container">
      <input type="email" v-model="email" placeholder="Email" class="input-field">
    </div>
    <div class="input-container">
      <input type="password" v-model="password" placeholder="Password" class="input-field">
    </div>
    <div class="button-container">
      <button @click="login" class="login-button">Login</button>
      <button @click="signup" class="signup-button">Sign up</button>
    </div>
  </div>
</template>

<script>
import firebase from '@/firebase.js';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          // User is logged in
          // Redirect to the main page or perform any other necessary action
        })
        .catch((error) => {
          // Handle login error
          console.error(error);
        });
    },
    signup() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          // User is signed up
          // Redirect to the main page or perform any other necessary action
        })
        .catch((error) => {
          // Handle signup error
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: black;
  color: lime;
}

.input-container {
  margin-bottom: 20px;
}

.input-field {
  padding: 10px;
  width: 300px;
  border: none;
  background-color: lime;
  color: black;
}

.button-container {
  display: flex;
  justify-content: center;
}

.login-button, .signup-button {
  padding: 10px 20px;
  margin: 0 10px;
  background-color: lime;
  border: none;
  color: black;
  cursor: pointer;
}

.login-button:hover, .signup-button:hover {
  opacity: 0.8;
}
</style>