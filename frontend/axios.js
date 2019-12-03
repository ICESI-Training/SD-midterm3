import axios from './configaxios.js'

export default {
    
    getUsers() {
        return new Promise((resolve, reject) => {
            axios.get('/users')
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject('Error getting open data', err);
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
                    reject('Error getting open data', err);
                })
        });
    },
    postData(data) {
        return new Promise((resolve, reject) => {
            axios.post('/users',data, {headers:{"Content-Type": "application/x-www-form-urlencoded"}})
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject('Error getting open data', err);
                })
        });
    },
}