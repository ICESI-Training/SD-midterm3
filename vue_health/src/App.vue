<template>
  <div id="app">
    <form>
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
      <button v-on:click="buttonCheckFront" type="submit">Execute FrontEnd Check</button>
      <button v-on:click="buttonCheckBack" type="submit">Execute Backend Check</button>
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
      axios.get(`http://0.0.0.0:8081/?`)
    .then(response => {
      //  this.generalGet = response.data
            console.log(response.data);

        if (response.status == 200) {
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
        console.log(response.data);

        if (response.status == 200) {
            this.backOk = true }
      })
    .catch(e => {
      this.backOk= false;
      console.log(e.response)
    })
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

