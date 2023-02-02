import axios from 'axios';
import config from '../constants/config';
import Config from '../constants/config';

/**
 * Axios defaults
 */
axios.defaults.baseURL = Config.baseUrl;
axios.defaults.timeout = Config.defaultTimeoutRequests;

// Headers
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json';
if (config.githubApiToken) {
  axios.defaults.headers.common.Authorization = 'Bearer ' + config.githubApiToken;
}

/**
 * Response Interceptor
 */
axios.interceptors.response.use(
  res => {
    // Status code isn't a success code - throw error
    if (!`${res.status}`.startsWith('2')) {
      throw res.data;
    }

    // Otherwise just return the data
    return res;
  },
  error => {
    // Pass the response from the API, rather than a status code
    if (error && error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  },
);

export { axios as Network };
