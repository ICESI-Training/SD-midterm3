<template>
  <v-container>
    <div>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Service</th>
              <th class="text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Web</td>
              <td>{{ apiActive }}</td>
            </tr>
            <tr>
              <td>API</td>
              <td>{{ apiActive }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </v-container>
</template>

<script>
const axios = require("axios");

// Production
const webUrl = "http://172.20.128.3";
const apiUrl = "http://172.20.128.2:5000";

export default {
  name: "HelloWorld",

  data: () => ({
    webActive: "DOWN",
    apiActive: "DOWN"
  }),
  methods: {
    async getApi() {
      await axios
        .get(apiUrl, {
          headers: {
            Accept: "application/json"
          }
        })
        .then(result => {
          // console.log(result);
          // console.log("UP");
          this.apiActive = "UP";
        })
        .catch(function(error) {
          // console.log(error);
          // console.log("DOWN");
          this.apiActive = "DOWN";
        });
    },
    async getWeb() {
      await axios
        .get(webUrl, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(result => {
          console.log(result);
          console.log("UP");
          this.webActive = "UP";
        })
        .catch(function(error) {
          console.log(error);
          console.log(error.message);
          if ("Network Error" == error.message) {
            this.webActive = "UP";
          } else {
            console.log("DOWN");
            this.webActive = "DOWN";
          }
        });
    }
  },
  mounted() {
    this.getApi();
    this.getWeb();
  }
};
</script>
