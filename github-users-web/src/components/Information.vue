<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">Welcome to My App</h1>
        <p class="subheading font-weight-regular">Please only insert a user from GitHub</p>
      </v-flex>

      <v-flex mb-6 xs12>
        <form>
          <v-text-field v-model="name" label="Name" data-vv-name="name" required></v-text-field>

          <v-btn class="mr-4" @click="submit">submit</v-btn>
        </form>
      </v-flex>

      <v-flex xs12 mb-6 mt-5>
        <v-simple-table fixed-header height="250px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Number of Repositories</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in users" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.numRepos }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const axios = require("axios");

// Production
const url = "http://172.20.128.2:5000";

export default {
  name: "Information",

  data: () => ({
    name: "",
    users: []
  }),
  methods: {
    async submit() {
      await axios
        .post(url + "/users/" + this.name, {
          headers: {
            Accept: "application/json"
          }
        })
        .then(result => {
          console.log(result);

          this.getUsers();
          // this.$router.go();
        })
        .catch(function(error) {
          console.log(error);
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          alert("ERROR: the user may already be added to the database or may not be a valid GitHub user")
        });
      this.name = "";
    },
    async getUsers() {
      await axios
        .get(url + "/users", {
          headers: {
            Accept: "application/json"
          }
        })
        .then(result => {
          this.users = JSON.parse(result.data);
        });
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>
