import axios from './axios';
import {
    apiOrderBook,
    apiGetAllOrder,
    apiGetDetailOrderById,
    apigetDetailSumOfPriceById,
    apiAcceptOrder,
} from './apiUrl'


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

export async function getAllOrder() {
    const result = await axios.get(apiGetAllOrder)
    if (result.status === 200) {
        return result.data?.data
    } else {
        return []
    }
}

export async function getDetailOrderById(id) {
    const result = await axios.get(apiGetDetailOrderById + id)
    if (result.status === 200) {
        return {
            data: result.data?.data[0],
            status: true,
            message: result.data?.message
        }
    } else {
        return {
            status: false,
            message: result.data?.message,
            data: {}
        }
    }

}

export async function getDetailSumOfPriceById(id) {
    const result = await axios.get(apigetDetailSumOfPriceById + id)
    if (result.status === 200) {
        return {
            data: result.data?.data[0],
            status: true,
            message: result.data?.message
        }
    } else {
        return {
            status: false,
            message: result.data?.message,
            data: {}
        }
    }
}

export async function updateOrderStatusbyId(status, orderId) {
    const result = await axios.post(apiAcceptOrder, {
        status: status,
        orderId: orderId
    })
    if (result.status === 200) {
        return {
            status: true,
        }
    }
    else {
        return {
            status: false,
        }
    }

}

