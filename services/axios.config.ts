import axios, { type AxiosStatic } from 'axios';

axios.defaults.baseURL = 'https://graph.facebook.com/v15.0';

export default axios as AxiosStatic;
