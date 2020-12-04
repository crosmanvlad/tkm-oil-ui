import axios from 'axios';
import { getCookie } from '../utils/cookie-handler';
import { TOKEN } from '../utils/constants';
import LogoutService from './LogoutService';

const URL_REQUEST_COLLECTION = `${process.env.BASE_URL}${process.env.COLLECTION_ENDPOINT}`;
const URL_REQUEST_COLLECTIONS = `${process.env.BASE_URL}${process.env.COLLECTIONS_ENDPOINT}`;
const URL_REQUEST_EXPORT = `${process.env.BASE_URL}${process.env.EXPORT_ENDPOINT}`;
const URL_REQUEST_MY_COLLECTIONS = `${process.env.BASE_URL}${process.env.MY_COLLECTIONS_ENDPOINT}`;

const addCollection = (firm, location, anexaNum, quantity, date) => {
  return axios
    .post(
      URL_REQUEST_COLLECTION,
      {
        firm,
        location,
        anexaNum,
        quantity,
        date
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
      console.log(err);
      return false;
    });
};

const getCollections = (query, from, to, page) => {
  return axios
    .get(
      `${URL_REQUEST_COLLECTIONS}?${query ? `_q=${query}` : ''}${from ? `&start=${from}` : ''}${
        to ? `&end=${to}` : ''
      }${page ? `&page=${page}` : ''}`,
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

const deleteCollection = (id) => {
  return axios
    .delete(`${URL_REQUEST_COLLECTION}/${id}`, {
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

const updateCollection = (collection) => {
  return axios
    .put(
      `${URL_REQUEST_COLLECTION}/${collection.id}`,
      {
        firm: collection.firm,
        location: collection.location,
        anexaNum: collection.anexaNum,
        quantity: collection.quantity,
        date: collection.date
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

const exportCollection = (query, from, to) => {
  return axios
    .get(
      `${URL_REQUEST_EXPORT}?${query ? `_q=${query}` : ''}${from ? `&start=${from}` : ''}${to ? `&end=${to}` : ''}`,
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

const getMyCollections = () => {
  return axios
    .get(URL_REQUEST_MY_COLLECTIONS, {
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
  addCollection,
  getCollections,
  deleteCollection,
  updateCollection,
  exportCollection,
  getMyCollections
};

export default CollectionService;
