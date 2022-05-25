import axios from './axios';
import {
    apiGetDetailBookById,
    apiGetRelatedBooks,
    apiGetHotBook,
    apiGetNewBook,
    apiGetBestSellerBook,
    apiGetSaleBook,
    apiGetListBookForOrder,
    apiGetAllBook
} from './apiUrl'

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

export async function getHotBook() {
    const result = await axios.get(apiGetHotBook)
    if (result.data?.statusCode === 200) {
        return result.data?.data;
    } else {
        return [];
    }
}

export async function getBestSellerBook() {
    const result = await axios.get(apiGetBestSellerBook)
    if (result.data?.statusCode === 200) {
        return result.data?.data;
    } else {
        return [];
    }
}

export async function getNewBook() {
    const result = await axios.get(apiGetNewBook)
    if (result.data?.statusCode === 200) {
        return result.data?.data;
    } else {
        return [];
    }
}

export async function getSaleBook() {
    const result = await axios.get(apiGetSaleBook)
    if (result.data?.statusCode === 200) {
        return result.data?.data;
    } else {
        return [];
    }
}

export async function getAllBook() {
    const result = await axios.get(apiGetAllBook)
    if (result.status === 200) {
        return result.data?.data
    } else {
        return []
    }
}