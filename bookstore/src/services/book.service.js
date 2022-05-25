import axios from './axios';
import { apiGetDetailBookById, apiGetRelatedBooks, apiGetListBookForOrder } from './apiUrl'

export async function getDetailBookById(id) {
    const result = await axios.get(apiGetDetailBookById + id)
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
export async function getRelatedBooks(bookId, subCatId) {
    const result = await axios.get(apiGetRelatedBooks + bookId + "/" + subCatId)
    if (result.status === 200) {
        return {
            data: result.data?.data,
            status: true,
            message: result.data?.message
        }
    } else {
        return {
            status: false,
            message: result.data?.message,
            data: []
        }
    }

}

export async function getListBookForOrder(arrId) {
    const result = await axios.get(apiGetListBookForOrder + arrId)
    if (result.status === 200) {
        return {
            data: result.data?.data,
            status: true,
            message: result.data?.message
        }
    } else {
        return {
            status: false,
            message: result.data?.message,
            data: []
        }
    }

}