import axios from 'axios';
import { setInterceptors } from './common/interceptor';

function initInstance() {
  const setInstance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
  return setInterceptors(setInstance);
}

const instance = initInstance();

function registerUser(input) {
  return instance.post('/signup', input);
}

function loginUser(input) {
  return instance.post('/login', input);
}

function fetchPosts() {
  return instance.get('/posts');
}

function createPost(input) {
  return instance.post('/posts', input);
}

export { registerUser, loginUser, fetchPosts, createPost };
