import axios from 'axios';

import { getAccessTokenCookies } from '../shared/util/accessTokenCookie';

const authorizedAxios = axios.create({
    // baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

authorizedAxios.interceptors.request.use(async (config) => {
  const token = await getAccessTokenCookies();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default authorizedAxios;
