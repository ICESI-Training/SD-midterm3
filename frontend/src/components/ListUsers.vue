<template>
    <table class="table mx-auto mt-5 col-sm-12">
            <thead>
                <tr>
                    <th scope="col">Id Number</th>
                    <th scope="col">Name</th>
                    <th scope="col">Lastname</th>
                </tr>
            </thead>
            <tbody >
                <tr v-for="user in users" v-bind:key="user.idnumber">
                    <th scope="row"> {{user.idnumber}}</th>
                    <td>{{user.name}}</td>
                    <td>{{user.lastname}}</td>
                </tr>
            </tbody>
        </table>
</template>

<script>
import api from '../axios'

export default {
    name: 'ListUsers',
    data(){
        return{
            users: []
        }
    },
    props:{
        create: Boolean
    },
    created(){
        api.getUsers().then(response=>{
                this.users= response.users
            }).catch(err=>{console.log(err)})
    },
    watch:{
        create(create){
            api.getUsers().then(response=>{
                this.users= response.users
            }).catch(err=>{console.log(err)})
        }
    }
}
</script>

<style scoped>

</style>