<template>
  <div class="container mt-5">
    <h1 class="text-center">Containers Healthcheck</h1>
    <table class="table mx-auto mt-5 col-sm-12">
      <thead>
        <tr>
          <th scope="col">Container</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="container in containers" v-bind:key="container.name">
          <th scope="row">{{container.name}}</th>
          <td> <i v-if="container.status=='UP'" class="fas fa-check-circle" style="color:green;"></i>
                <i v-if="container.status=='DOWN'" class="far fa-times-circle" style="color:red;"></i> {{container.status}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "../../configaxios";

export default {
  name: "Home",
  data() {
    return {
      containers: [
        { name: "Backend", status: "" },
        { name: "Frontend", status: "" }
      ]
    };
  },
  created() {
    //BACKEND
    axios
      .get("http://localhost:4000")
      .then(response => {
         if(response.status== 200){
             this.containers[0].status = "UP" 
         }         
      })
      .catch(err => {
        this.containers[0].status = "DOWN"
      });

    //FRONTEND 
    axios
      .get("http://localhost:8080/index.html")
      .then(response => {
        if(response.status== 200){
             this.containers[1].status = "UP" 
         } 
      })
      .catch(err => {
        this.containers[1].status = "DOWN"
      });
  }
};
</script>

<style scoped>
</style>