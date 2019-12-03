<template>
  <div id="app">
    <form>
      <div>
        <label for="cc">CC or Id:</label>
        <br />
        <input id="cc" type="message" v-model="cc" @keypress="isNumber($event)" />
      </div>
      <div>
        <label for="username">Username:</label>
        <br />
        <input id="username" type="text" v-model="username" />
      </div>
      <button v-on:click="buttonPost" type="submit">Insert</button>
      <div></div>
      <div>
        <label for="userlist">In the following box you can view the result of a general GET request</label>
        <br />
        <textarea id="userlist " v-model="generalGet" disabled></textarea>
      </div>
      <!--  este esta duplicado, cambiar -->
      <button v-on:click="buttonGeneralGet" type="submit">General Get</button>
      <div></div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.withCredentials = true;
export default {
  name: "app",
  components: {},
  data:function() {
return {
      cc: '',
      username: '',
      generalGet:''
  };
},
  methods: {
        buttonGeneralGet() {
      axios.get(`http://0.0.0.0:5050/users/`)
    .then(response => {
      // JSON responses are automatically parsed.
      // this.posts = response.data,
      this.generalGet = response.data
    })
    .catch(e => {
      console.log(e.response)
      // console.log(response)
    })
    },
    buttonPost(){

      axios
        .post(`http://0.0.0.0:5050/users/insert/${this.cc}/${this.username}`, {headers:{"Content-Type":"application/json"}})
        .catch(error => {
          console.log(error.response);
        });
      this.cc = "";
      this.username = "";
    },
    isNumber: function(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    }
  }
};
</script>

<style>
#app {
  display: flex;
  justify-content: center;
  font-family: "Work Sans", sans-serif;
}

form {
  width: 500px;
  padding: 10px 40px;
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
}

pre-content {
  width: 500px;
}
</style>

