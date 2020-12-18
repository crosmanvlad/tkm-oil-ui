import axios from 'axios';
import { getCookie } from '../utils/cookie-handler';
import { TOKEN } from '../utils/constants';
import LogoutService from './LogoutService';

const URL_REQUEST_USERS = `${process.env.BASE_URL}${process.env.USERS_ENDPOINT}`;
const URL_REQUEST_USER = `${process.env.BASE_URL}${process.env.USER_ENDPOINT}`;
const URL_REQUEST_SIGNUP = `${process.env.BASE_URL}${process.env.SIGNUP_ENDPOINT}`;

const getUsers = () => {
  return axios
    .get(URL_REQUEST_USERS, {
      headers: {
        'x-access-token': getCookie(TOKEN)
      }
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((err) => {
      if (err.response.status === 401) {
        LogoutService.logout();
      }
      return false;
    });
};

const getUser = (userId) => {
  return axios
    .get(`${URL_REQUEST_USER}/${userId}`, {
      headers: {
        'x-access-token': getCookie(TOKEN)
      }
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      if (err.response.status === 401) {
        LogoutService.logout();
      }
      return false;
    });
};

const createUser = (email, password, firstName, lastName, role) => {
  return axios
    .post(
      URL_REQUEST_SIGNUP,
      {
        email,
        password,
        firstName,
        lastName,
        role
      },
      {
        headers: {
          'x-access-token': getCookie(TOKEN)
        }
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      if (err.response.status === 401) {
        LogoutService.logout();
      }
      return false;
    });
};

const updateUser = (userId, email, firstName, lastName, role) => {
  return axios
    .put(
      `${URL_REQUEST_USER}/${userId}`,
      {
        email,
        firstName,
        lastName,
        role
      },
      {
        headers: {
          'x-access-token': getCookie(TOKEN)
        }
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      if (err.response.status === 401) {
        LogoutService.logout();
      }
      return false;
    });
};

const updateUserPass = (userId, password) => {
  return axios
    .put(
      `${URL_REQUEST_USER}/${userId}/pass`,
      {
        password
      },
      {
        headers: {
          'x-access-token': getCookie(TOKEN)
        }
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      if (err.response.status === 401) {
        LogoutService.logout();
      }
      return false;
    });
};

const deleteUser = (userId) => {
  return axios
    .delete(`${URL_REQUEST_USER}/${userId}`, {
      headers: {
        'x-access-token': getCookie(TOKEN)
      }
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      if (err.response.status === 401) {
        LogoutService.logout();
      }
      return false;
    });
};

const CollectionService = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  updateUserPass
};

export default CollectionService;
