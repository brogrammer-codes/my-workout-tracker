import axios from 'axios';

export const setAxiosToken = (user) => {
    if (user && user.access_token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.access_token}`
    }
};