import store from '@/store';
import axios from 'axios';



const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    Authorization: store.state.token,
  },
});

function registerUser(input) {
  return instance.post('/signup', input);
}

function loginUser(input) {
  return instance.post('/login', input);
}

export { registerUser, loginUser };
