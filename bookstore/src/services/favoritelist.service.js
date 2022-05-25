import axios from './axios';
import { apiDeleteFavoriteBook, apiCheckFavoriteBook, apiInsertFavoriteBook } from './apiUrl'

export async function checkFavorited(bookId, userId) {
    const result = await axios.get(apiCheckFavoriteBook + bookId + '/' + userId).catch((err) => { return err })
    if (result.data?.statusCode === 200) {
        return {
            status: true,
            message: result.data?.message,
            isFavorited: result.data?.isFavorited
        }
    } else {
        return {
            status: false,
            message: result.data?.message,
            isFavorited: false
        }
    }
}

// delete favorite

export async function deleteFavorite(userId, bookId) {
    const result = await axios.delete(apiDeleteFavoriteBook + bookId + '/' + userId)
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
// insert rating 
export async function insertFavorite(userId, bookId) {
    const result = await axios.post(apiInsertFavoriteBook + bookId, {
        userId: userId

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