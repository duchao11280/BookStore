import axiosBase from 'axios'
import settings from '../config/settings';
const axios = axiosBase.create({
    withCredentials: true,
    baseURL: settings.host,
})

export default axios;