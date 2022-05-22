import axios from './axios';
import { apiGetAllCatAndSubCat } from './apiUrl'

export async function getAllCatAndSubCat() {
    const result = await axios.get(apiGetAllCatAndSubCat)
    if (result.data?.statusCode === 200) {
        return result.data?.data
    } else {
        return []
    }
}