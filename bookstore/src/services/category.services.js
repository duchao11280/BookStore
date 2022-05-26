import axios from './axios';
import { apiGetAllCatAndSubCat, apiInsertCategory, apiUpdateCategory } from './apiUrl'

export async function getAllCatAndSubCat() {
    const result = await axios.get(apiGetAllCatAndSubCat)
    if (result.data?.statusCode === 200) {
        return result.data?.data
    } else {
        return []
    }
}

export async function insertCategory(catName) {
    const result = await axios.post(apiInsertCategory, {
        catName: catName
    });
    console.log(catName, result);
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
export async function updateCategory(id, catName) {
    const result = await axios.put(apiUpdateCategory + id, {
        catName: catName
    });
    console.log(catName, result);
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