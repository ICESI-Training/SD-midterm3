<template>
  <div id="app">
    <form @submit.prevent="submitForm">
      <div>
        <h2>_JuanBol & AndresZ API Health Checks_</h2> 
        <br />
        <br />
        <br />
        <label for="front">Health Check for FrontEnd module : </label><label v-if="this.frontOk" for="front">¡Passed! (Functional) </label><label v-if="!this.frontOk" for="front">Not passed</label>
        <br />
        <br />
      </div>
      <div>
        <label for="back">Health Check for BackEnd module : </label><label v-if="this.backOk" for="back">¡Passed! (Functional)</label><label v-if="!this.backOk" for="back">Not passed</label>
        <br />
        <br />
        <br />
      </div>
      <!-- <button v-on:click="buttonCheckFront" type="submit">Execute FrontEnd Check</button> -->
      <button v-on:click="buttonCheckBack" type="submit">Execute Check</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

export default {
  name: "app",
  components: {},
  data:function() {
return {
      front: '',
      back: '',
      frontOk: false,
      backOk: false
  };
},
  methods: {
      buttonCheckFront(){
      axios.get(`http://172.18.0.3/`)
    .then(response => {
      //  this.generalGet = response.data
            console.log(response.data);
console.log("RESPONSE")
        if (response.status == 200) {
          console.log("entro")
            this.frontOk = true }
        })
    .catch(e => {
      this.frontOk= false;
      
      console.log(e.response)
    })
    },
      buttonCheckBack(){
      axios.get(`http://0.0.0.0:5050/users/`)
    .then(response => {
      console.log("response")
        console.log(response.data);

        if (response.status == 200) {
            this.backOk = true,
            this.frontOk = true }
      })
    .catch(e => {
      this.backOk= false;
      console.log("catch")
      console.log(e.toString())
    })
    },
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

