import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL || '';

export const fetchPlan = (plan_id) => {
    const options = {
        method: 'GET',
        url:  `${API}/tasks?task_id=${plan_id}`,
    };
    return axios(options)
        .then(({data}) => data)
        .catch((error) => console.log(error));
}

export const searchPlan = (params) => {
    const options = {
        method: 'GET',
        url:  `${API}/task/type?type=plan`,
        params,
    };
    return axios(options)
        .then(({data}) => data[0])
        .catch((error) => console.log(error));
}

export const patchPlan = (data) => {
    const options = {
        method: 'PATCH',
        url:  `${API}/task`,
        data,
    };
    return axios(options)
        .then(({data}) => data[0])
        .catch((error) => console.log(error));
    }
