<template>
  <v-container>
    <div>
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr>
              <td>Frontend</td>
              <td>{{ estadoFrontend }}</td>
            </tr>
            <tr>
              <td>API</td>
              <td>{{ estadoAPI }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </v-container>
</template>

<script>
import Vue from 'vue'
import api from "../../axios.js";
import axios from '../../configaxios-copy.js'
export default {
  data: () => ({
    estadoAPI: "DOWN",
    estadoFrontend: "DOWN",
  }),
  created() {
    api
      .getUsers()
      .then((response) => {
                    this.estadoAPI = 'UP';
                })
      .catch((err) => {
                    this.estadoAPI = 'DOWN';
                }),
    
    axios
      .get('/#/home')
      .then((response) => {
                    this.estadoFrontend= 'UP';
                })
      .catch((err) => {
                    if ("Network Error" == err.message) {
                        this.estadoFrontend = "UP";
                      } else {
                        this.estadoFrontend = "DOWN";
                      }
                })
  }};
   
</script>