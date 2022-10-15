import axios from 'axios';

const URL_BASE = 'http://127.0.0.1:4000';

function postSignUp(registration) {
  const promise = axios.post(`${URL_BASE}/sign-up`, registration);
  return promise;
};

function postLogin(login) {
  const promise = axios.post(`${URL_BASE}/`, login);
  return promise;
};

function Header() {
  const authorization = JSON.parse(localStorage.getItem('mywallet'));
  const config = {
    headers: {
      authorization: `Bearer ${authorization.token}`,
    }
  };
  return config;
};

export { postSignUp, postLogin };