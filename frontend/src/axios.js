import axios from './configaxios.js'

export default{
    getUsers() {
        return new Promise((resolve, reject) => {
            axios.get('/users')
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject('Error getting users', err);
                })
        });
    },
    postUsers(data){
        return new Promise((resolve, reject) => {
            axios.post(`/users`, data)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject('Error creating user',err);
            })
        });
    }
}