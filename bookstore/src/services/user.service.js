import axios from './axios';
import { apiLogin, apiSignup } from './apiUrl'

export async function postSignup(phone, fullName, password, address) {
    const result = await axios.post(apiSignup, {
        phone: phone,
        fullName: fullName,
        password: password,
        address: address
    });

    if (result.data?.statusCode === 200) {
        return {
            status: true,
            message: result.data?.message
        }
    } else {
        return {
            status: false,
            message: result.data?.message
        }
    }
}

export async function postLogin(phone, password) {
    const result = await axios.post(apiLogin, {
        phone: phone,
        password: password,
    });
    if (result.data?.statusCode === 200) {
        return {
            status: true,
            message: result.data?.message,
            data: result.data?.data
        }
    } else {
        return {
            status: false,
            message: result.data?.message
        }
    }
}