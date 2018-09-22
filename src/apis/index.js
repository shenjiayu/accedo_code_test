import config from '../config';
import axios from 'axios';

// response interceptor
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (401 === error.response.status) {
    console.error('unauthenticed');   
    alert('unauthenticated');
  } else if (403 === error.response.status) {
    console.error('unauthorised');
    alert('unauthorised');
  } else if (404 === error.response.status) {
    console.error('not found');
    alert('not found');
  } else if (error.response.status >= 500) {
    console.error('server error');
    alert('server error');
  }
  return Promise.reject(error);
});

const movies_index = () => {
  // fetch movies data from the end point
  return axios.get(config.movies_api)
              .then(data => data.data)
              .catch(err => {});
};

export default {
  movies_index
};