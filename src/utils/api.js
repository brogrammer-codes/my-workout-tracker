import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL || '';


export const login = async (email, password) => {
    const options = {
        method: 'POST',
        url: `${API}/login`,
        data: { email, password },
    };
    return axios(options)
        .then(({ data }) => {
            const accessToken = data[0]?.session?.session?.access_token
            const user = data[0]?.session?.user
            localStorage.setItem('token', accessToken);
            return user
        })
        .catch((error) => console.log(error));
};

export const signup = async (email, password, appURL) => {
    const options = {
        method: 'POST',
        url: `${API}/sign-up`,
        data: { email, password },
    };
    return axios(options)
        .then(({ data }) => {
            if (data) return true
        })
        .catch((error) => console.log(error));
}
export const fetchUser = async () => {
    const options = {
        method: 'GET',
        url: `${API}/user`,
    };
    return axios(options)
        .then(({ data }) => data?.user)
        .catch((error) => console.log(error));
};
export const fetchTaskTree = async (task_id=null) => {
    const options = {
        method: 'GET',
        url: `${API}/tasks`,
        params: { task_id },
    };
    try {
        const { data } = await axios(options);
        return data;
    } catch (error) {
        return console.log(error);
    }
}
export const fetchProfiles  = async () => {
    const options = {
        method: 'GET',
        url: `${API}/profiles`,
    };
    return axios(options)
        .then(({ data }) => data)
        .catch((error) => console.log(error));
}

export const patchUserProfile = async (data) => {
    const options = {
        method: 'PATCH',
        url: `${API}/user/profile`,
        data,
    };
    return axios(options)
        .then(({ profile }) => profile)
        .catch((error) => console.log(error));

};
export const fetchTaskSubTree = (task_id) => {
    const options = {
        method: 'GET',
        url: `${API}/tasks?task_id=${task_id}`,
    };
    return axios(options)
        .then(({ data }) => data)
        .catch((error) => console.log(error));
}

export const searchTypeWithKeyword = (type, keyword=null) => {
    const options = {
        method: 'GET',
        url: `${API}/task/type`,
        params: { type, keyword },
    };
    return axios(options)
        .then(({ data }) => data[0])
        .catch((error) => console.log(error));
}
export const postTask = async (data) => {
    const options = {
        method: 'POST',
        url: `${API}/task`,
        data,
    };
    return axios(options)
        .then(({ data }) => data[0])
        .catch((error) => console.log(error));
  };
export const patchTask = (data) => {
    const options = {
        method: 'PATCH',
        url: `${API}/task`,
        data,
    };
    return axios(options)
        .then(({ data }) => data[0])
        .catch((error) => console.log(error));
}
export const deleteTask = async (data) => {
    const options = {
        method: 'DELETE',
        url: `${API}/task`,
        data,
    };
    return axios(options)
        .then(({ data }) => data[0])
        .catch((error) => console.log(error));
}
export const cloneTask = async (task_id, parent_id) => {
    const options = {
        method: 'POST',
        url: `${API}/task/clone`,
        data: {task_id, parent_id},
    };
    return axios(options)
        .then(({ data }) => data[0])
        .catch((error) => console.log(error));
  };

export const createSharedTask = async (task_id) => {
    const options = {
        method: 'POST',
        url: `${API}/shared-task/create`,
        data: {task_id},
    };
    return axios(options)
        .then(({ data }) => data[0])
        .catch((error) => console.log(error));
  };
