import axios from './axios';
import {
    apiGetDetailBookById,
    apiGetRelatedBooks,
    apiGetHotBook,
    apiGetNewBook,
    apiGetBestSellerBook,
    apiGetSaleBook,
    apiGetListBookForOrder,
    apiGetAllBook,
    apiDeleteBook,
    apiInsertBook,
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

export async function deleteBook(id) {
    const result = await axios.post(apiDeleteBook + id, {
        id: id
    });
    if (result.data?.statusCode === 200) {
        return {
            status: true,
        }
    } else {
        return {
            status: false,
        }
    }
}

export async function insertBook(bookName, auth, description, language,
    year, nxb, price, quantity, subCatId, sale, coverImg, thumbnails) {
    var data = new FormData();
    data.append("bookName", bookName);
    data.append("auth", auth);
    data.append("description", description);
    data.append("language", language);
    data.append("year", year);
    data.append("nxb", nxb);
    data.append("price", price);
    data.append("quantity", quantity);
    data.append("subCatId", subCatId);
    data.append("sale", sale);
    data.append("cover", coverImg);
    data.append("thumbnails", thumbnails);

    // const result = await axios.postForm(apiInsertBook, {
    //     data: data
    // });
    // if (result.data?.statusCode === 200) {
    //     return {
    //         status: true,
    //     }
    // } else {
    //     return {
    //         status: false,
    //     }
    // }
    const response = await fetch(
        ' http://localhost:1188' + `/api/admin/book/add`,
        {
            method: 'POST',
            credentials: 'include',
            body: data
        }
    );
    const json = await response.json();
    return json;
}

