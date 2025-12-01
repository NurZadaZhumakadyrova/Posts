import axios from 'axios';

const baseURL = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

export default baseURL;
