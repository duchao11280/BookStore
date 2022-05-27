import axios from './axios';
import { 
    apiGetRatingByBookId, 
    apiUpdateRating, 
    apiInsertRating 
} from './apiUrl'

export async function getRatingByBookId(id) {
    const result = await axios.get(apiGetRatingByBookId + id).catch((err) => { return err })
    if (result.status === 200) {
        return {
            data: result.data?.data,
            status: true,
            message: result.data?.message,
            avgRating: result.data?.avgRating
        }
    } else {
        return {
            status: false,
            message: result.data?.message,
            data: [],
            avgRating: 0,
        }
    }
}

// update rating

export async function updateRating(userId, bookId, rate, content) {
    const result = await axios.put(apiUpdateRating + bookId, {
        userId: userId,
        rate: rate,
        content: content
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
// insert rating 
export async function insertRating(userId, bookId, rate, content) {
    const result = await axios.post(apiInsertRating + bookId, {
        userId: userId,
        rate: rate,
        content: content
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