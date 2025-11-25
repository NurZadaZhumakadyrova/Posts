import axios from 'axios';

const axiosAPI = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

export default axiosAPI;
