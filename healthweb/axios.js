import axios from './configaxios.js'

export default {
    
    getUsers() {
        return new Promise((resolve, reject) => {
            axios.get('/users')
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject('Error al obtener los datos de los usuarios', err);
                })
        });
    },
    getUser(data) {
        return new Promise((resolve, reject) => {
            axios.get(`/users/?id=${data.id}`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject('Error al obtener los datos de ese usuario', err);
                })
        });
    },
    saveUser(data) {
        return new Promise((resolve, reject) => {
            axios.post('/users',data,{headers: {
                Accept: "application/json"
              }})
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject('Error al guardar el usuario', err);
                })
        });
    },
}