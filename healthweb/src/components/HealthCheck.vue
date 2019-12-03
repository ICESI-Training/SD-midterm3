<template>
  <v-container>
  
      <div class="init">
    <h1 style="">Datos de usuarios</h1>
   
      <v-simple-table>
        <template v-slot:default>
           <thead>
          <tr>
            <th class="text-left">Servidor</th>
            <th class="text-left">Estado</th>
          </tr>
        </thead>
          <tbody>
            <tr>
              <td>Frontend</td>
              <td v-if="estadoFrontend">
                
                 <img :src="require(`@/assets/ok.png`)" class="img" />

              </td>
              <td v-else>
              <img :src="require(`@/assets/down.png`)" class="img" />
              </td>
            </tr>
            <tr>
              <td>API</td>

                <td v-if="estadoAPI">
                
                 <img :src="require(`@/assets/ok.png`)" class="img" />

              </td>
              <td v-else>
              <img :src="require(`@/assets/down.png`)" class="img" />
              </td>

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
    estadoAPI: false,
    estadoFrontend: false,
  }),
  created() {
    api
      .getUsers()
      .then((response) => {
                    this.estadoAPI = true;
                })
      .catch((err) => {
                    this.estadoAPI =false;
                }),
    
    axios
      .get('/#/home', {
          headers: {
            Accept: "text/html",
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin":"*",
          }
        })
      .then((response) => {
                    this.estadoFrontend= true;
                })
      .catch((err) => {
        console.log(err)
                   if ("Network Error" == err.message) {
             this.estadoFrontend = true;
          } else {
             this.estadoFrontend = false;
          }
                     
                      
                })
  }};
   
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins|Roboto&display=swap");

.init{
  margin: 0 auto;
  width: 30%;
}
h1 {
  font-family: "Poppins";
  font-style: normal;
  font-weight: bold;
  font-size: 64px;
  line-height: 96px;
  color: #0c186d;
}