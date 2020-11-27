import axios from 'axios';

const URL_REQUEST = `${process.env.BASE_URL}${process.env.LOGIN_ENDPOINT}`;

const login = (email, password) => {
  return axios
    .post('http://localhost:3088/api/login', {
      email,
      password
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

const LoginService = {
  login
};

export default LoginService;
