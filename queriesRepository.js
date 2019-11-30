import Main from main.js;

export default {
    generalizedGet(cc) {
        return Main.get(`${resource}/users`);
    },
    get(cc, username){
        return Main.post(`${resource}/users/`+cc);
    },
    insertCC(cc, username){
        return Main.post(`${resource}/users/`+cc+`/`+username);
    }
}

