import axios, { type Axios } from 'axios';

const defaultClient: Axios = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/' : 'https://api.jaewoomade.com',
});

export default defaultClient;