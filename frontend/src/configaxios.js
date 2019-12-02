import axios from 'axios'

export default axios.create({
    baseURL: 'http://127.0.0.1:4000/api', 
    headers: {
     'X-Requested-With': 'XMLHttpRequest',
     //'Content-Type': 'application/json',
     //'Access-Control-Allow-Headers' : 'Access-Control-Allow-Headers, Access-Control-Allow-Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
     //'Content-Type': 'application/json', 
    // 'Access-Control-Allow-Origin' : '*',
    // 'Access-Control-Allow-Headers' : 'Access-Control-Allow-Headers, Access-Control-Allow-Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
     //'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,OPTIONS'
    }
})