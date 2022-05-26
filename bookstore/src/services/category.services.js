import axios from './axios';
import { apiGetAllCatAndSubCat, apiGetHotCategory } from './apiUrl'

export async function getAllCatAndSubCat() {
    const result = await axios.get(apiGetAllCatAndSubCat)
    if (result.data?.statusCode === 200) {
        return result.data?.data;
    } else {
        return [];
    }
}

export async function getHotCategory() {
    const result = await axios.get(apiGetHotCategory);
    if (result.data?.statusCode === 200) {
        return result.data?.data;
    } else {
        return [];
    }
}