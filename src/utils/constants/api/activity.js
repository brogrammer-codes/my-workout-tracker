import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL || '';

export const searchActivity = (params) => {
    const options = {
        method: 'GET',
        url:  `${API}/task/type?type=activity`,
        params,
    };
    return axios(options)
        .then(({data}) => data[0])
        .catch((error) => console.log(error));
}