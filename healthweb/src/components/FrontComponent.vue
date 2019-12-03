<template>

<div class="init">
    <h1 style="">Datos de usuarios</h1>
    <div >
      <v-container class="fill-height" style="min-height: 100%">
        <!--INITIAL IMAGE -->
        
            
            
       
      </v-container>
    </div>

 

<div>
 <p style="padding-bottom:5vh;padding-top:5vh;">Ingresa un nuevo usuario </p>
       

  <div >
      <form @submit.prevent="submitform">
          <label for="id">Id </label>
       <input style=" border: 2px solid black;
  border-radius: 3px;margin-bottom:2vh;" type="text" name="id" v-model="formdata.id"> 
  <br>
  <label for="name">Nombre </label>
       <input style=" border: 2px solid black ;
  border-radius: 3px;margin-bottom:2vh;" type="text"  name="name" v-model="formdata.name"> 
      <br>
      <button style="margin-top:2vh;border-radius: 4px; 
         background-color: white;
  color: black;
  border: 2px solid #0c186d;
       " type="submit">
         Guardar
       </button>
    </form>
  </div>
  
   <p style="padding-bottom:5vh;padding-top:5vh;">Tabla con los datos de los usuarios registrados actualmente </p>
       
  <v-data-table
 
   
    :headers="headers"
    :items="json_data"
    :items-per-page="5"
    v-bind:loading="loading"
     loading-text="Cargando... por favor espere."
    calculate-widths
    class="elevation-1"
   
  ></v-data-table>

</div>
  </div> 
</template>
 <!--loading loading-text="Cargando... por favor espere."-->
<script>
import Vue from 'vue'
import api from "../../axios.js";
export default {
    
     created() {
    api
      .getUsers()
      .then(response => {
        this.json_data = response;
        console.log(this.json_data);
        this.loading = false;
      })
      .catch(err => console.log(err));
  },
    data(){
        return{
            formdata:{ id: '', name: ''},
            loading: true,
            json_data:[],
            headers:[
                {text:"id", value:'id'},
                {text:"name", value:'name'},
            ],
           
        json_fields: {
                "id":'id',
                "name":'name'
                
        }
            ,json_meta: [
            [
                {
                    'key': 'charset',
                    'value': 'utf-8'
                }
            ]
        ],
 };
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

p {
  font-family: "Roboto";
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 36px;
}

</style>