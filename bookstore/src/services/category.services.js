import axios from './axios';
import { apiGetAllCatAndSubCat, apiInsertCategory, apiUpdateCategory, apiInsertSubCategory, apiUpdateSubCategory, apiDisableCategory, apiDisableSubCategory, apiGetHotCategory } from './apiUrl'

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

// Sub categories
export async function insertSubCategory(catId, subCatName) {
    const result = await axios.post(apiInsertSubCategory + catId, {
        subCatName: subCatName
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

export async function updateSubCategory(id, subCatName) {
    const result = await axios.put(apiUpdateSubCategory + id, {
        subCatName: subCatName
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

export async function disableCat(id) {
    const result = await axios.put(apiDisableCategory + id);
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

export async function disableSubCat(id) {
    const result = await axios.put(apiDisableSubCategory + id);
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