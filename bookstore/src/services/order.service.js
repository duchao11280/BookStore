import axios from './axios';
import { apiOrderBook } from './apiUrl'


// insert rating 
export async function insertOrder(phone, fullName, address, listOrder) {
    const result = await axios.post(apiOrderBook, {
        phone: phone,
        fullName: fullName,
        address: address,
        listOrder: listOrder,
    });
    if (result.data?.statusCode === 200) {
        return {
            status: true,
            message: result.data?.message,
        }
    } else {
        return {
            status: false,
            message: result.data?.message
        }
    }
}