<template>
  <div id="app">
    <form @submit.prevent="submitForm">
      <div>
        <label for="cc">CC or id:</label>
        <br />
        <input id="cc" type="tel" v-model="name" />
      </div>
      <div>
        <label for="username">Username:</label>
        <br />
        <input id="username" type="text" v-model="email" />
      </div>
      <div>
        <label for="userlist">Who was the first son on mahtmagandi:</label>
        <br />
        <textarea id="userlist " v-model="firstSon"></textarea>
      </div>
      <button :class="[name ? activeClass : '']" type="submit">Submit</button>
      <div>
        <h3>Data retrieved from server:</h3>
        <p v-if="success">{{ success }}</p>
        <pre>{{ response }}</pre>
      </div>
    </form>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import axios from "axios";
export default {
  name: "app",
  components: {
    // HelloWorld
  },

  methods: {
    submitForm() {
      axios
        .post("//jsonplaceholder.typicode.com/posts", {
          userID: this.userID,
          name: this.name,
          email: this.email,
          firstSon: this.firstSon
        })
        .then(response => {
          // console.log(response);
          // this.response = response.data
          this.success = "Data saved successfully";
          this.response = JSON.stringify(response, null, 2);
        })
        .catch(error => {
          this.response = "Error: " + error.response.status;
        });
      this.name = "";
      this.email = "";
      this.firstSon = "";
    }
  }
};
</script>

<style>
$primary: #5968d7;

#app {
  display: flex;
  justify-content: center;
  font-family: "Work Sans", sans-serif;
}

form {
  width: 500px;
  padding: 10px 40px;
  label {
    text-transform: uppercase;
    font-size: 13px;
    letter-spacing: 0.03em;
    font-weight: bold;
  }
  input,
  textarea {
    border: 1px solid #ccc;
    color: #333;
    width: calc(100% - 30px);
  }
  input,
  textarea,
  button {
    border-radius: 4px;
    padding: 8px 15px;
    font-family: "Work Sans", sans-serif;
    font-weight: 300;
  }
  div {
    margin: 20px 0;
  }
}

button {
  color: white;
  border: none;
  width: calc(100% - 30px);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: #ccc;
  cursor: pointer;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
  transition: 0.25s all ease;
  &:hover {
    transform: translateY(2px);
  }
}

.active {
  background: $primary;
}

pre-content {
  width: 500px;
}
</style>

