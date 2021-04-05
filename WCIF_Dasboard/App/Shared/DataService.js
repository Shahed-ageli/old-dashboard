import axios from 'axios';

axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('SECRET_KEY');

const baseUrl = 'http://localhost:3000/api';



export default {

    getUser() {
        return axios.get(baseUrl + `/user/getAllUsers`);
    },

    addUser(UserInfo) {
        return axios.post(baseUrl + `/user/addUser` , UserInfo);
    },
    editUser(UserInfo) {
        return axios.put(baseUrl + `/user/editUserInfo`, UserInfo);
    },
    getCategory() {
      
        return axios.get(baseUrl + `/category/get`);
    }
}