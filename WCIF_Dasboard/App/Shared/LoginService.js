import axios from 'axios';

axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

const baseUrl = 'http://localhost:3000/api';


export default {

    loginUserAccount(user) {       
        return axios.post(baseUrl +`/auth/login`, user);
    },
    ResetPassword(email) {
        return axios.post(`/Security/ResetPassword/${email}`);
    }  
}