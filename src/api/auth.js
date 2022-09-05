import { instance } from '@/api/index';

function registerUser(input) {
  return instance.post('/signup', input);
}

function loginUser(input) {
  return instance.post('/login', input);
}

export { registerUser, loginUser };
