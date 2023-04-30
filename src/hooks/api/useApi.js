import { useEffect, useState } from 'react';
import { setAxiosToken } from "@/utils/constants/init";

export const useApi = () => {
    const [token, setToken] = useState(null)
    useEffect(() => {
        setToken(window.localStorage.getItem('token'));
    }, [])
    useEffect(() => {
        if (token) {
          setAxiosToken({ access_token: token })
        }
      }, [token])
    return {setToken, token}
}