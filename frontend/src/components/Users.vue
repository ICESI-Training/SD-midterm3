<template>
  <div class="mx-auto col-sm-6">
    <div class="form-group">
      <label for="idnumber">Identification Number(CC)</label>
      <input
        type="text"
        class="form-control"
        name="idnumber"
        v-model="id"
        placeholder="Enter identification number"
      />
    </div>
    <div class="form-group">
      <label for="name">Name</label>
      <input
        type="text"
        class="form-control"
        name="name"
        v-model="name"
        placeholder="Enter your name"
      />
    </div>
    <div class="form-group">
      <label for="lastname">Lastname</label>
      <input
        type="text"
        class="form-control"
        v-model="lastname"
        name="lastname"
        placeholder="Enter your lastname"
      />
    </div>
    <div v-if="submitStatus!=''" class="px-5 alert alert-danger" role="alert">{{submitStatus}}</div>
    <div v-if="success!=''" class="pa-5 alert alert-success" role="alert">{{success}}</div>
    <button type="submit" class="btn btn-primary" @click="createUser">Add new register</button>

    <ListUsers :create="create"></ListUsers>
  </div>
</template>

<script>
import api from '../axios.js'
import ListUsers from './ListUsers'

export default {
    components:{
      ListUsers
    },
    data(){
        return{
            id: 0,
            name: '',
            lastname: '',
            submitStatus: '',
            success: '',
            create: false
        }
    },
    methods:{
        createUser(){
            this.success=""
            this.submitStatus=""
            let data={
                idnumber: this.id,
                name: this.name,
                lastname: this.lastname
            }
            api.postUsers(data).then(response => {
                this.success= "User created correctly!"
                if(!this.create){
                  this.create= true
                }else{
                  this.create= false
                }
            }).catch(err=> {
                console.log(err)
                this.submitStatus = "Error. Try again!"
            })

            this.id=0
            this.name ="",
            this.lastname = ""
        }
    }
};
</script>

<style scoped>
</style>