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
      .get('/')
      .then((response) => {
                    this.estadoFrontend= 'UP';
                })
      .catch((err) => {
                    this.estadoFrontend = 'DOWN';
                })
  },
methods: {
   async  submitform(){
         
         let data={
             id: this.formdata.id,
             name: this.formdata.name
         }
         let answ=`id=${data.id}&name=${data.name}`
         console.log(data.id)
         console.log(data.name)
     await    api.saveUser(answ).then(response => {
        
        console.log(response);
       
      })
      .catch(err => console.log(err));
  },
     
}
        };
   
</script>