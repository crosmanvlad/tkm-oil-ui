import axios from 'axios';
import { getCookie } from '../utils/cookie-handler';
import { TOKEN } from '../utils/constants';

const URL_REQUEST = `${process.env.BASE_URL}${process.env.COLLECTION_ENDPOINT}`;

const addCollection = (firm, location, anexaNum, quantity, date) => {
  return axios
    .post(
      URL_REQUEST,
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

const CollectionService = {
  addCollection
};

export default CollectionService;
