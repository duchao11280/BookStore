const apiSignup = "/api/user/signup";
const apiLogin = "/api/user/login";
const apiGetAllCatAndSubCat = "/api/category/getall";
const apiGetDetailBookById = '/api/book/'
const apiGetRatingByBookId = '/api/rating/bybook/'
const apiUpdateRating = '/api/rating/update/book/'
const apiInsertRating = '/api/rating/rate/book/'
/**
 * /related/:bookid/:subcatid
 */
const apiGetRelatedBooks = '/api/book/related/'
/**
 * /api/favoritelist/check/:bookid/:userid
 */
const apiCheckFavoriteBook = '/api/favoritelist/check/'
/**
 * POST
 * /api/favoritelist/add/:bookid
 *  body: userId
 */
const apiInsertFavoriteBook = '/api/favoritelist/add/'
/**
 * /api/favoritelist/delete/:bookid/:userid
 */
const apiDeleteFavoriteBook = '/api/favoritelist/delete/'
/**
 * 
 */
const apiGetListBookForOrder = '/api/book/bookforcart/'
const apiOrderBook = '/api/order/insertorder'
const apiGetAllOrder = '/api/admin/order/getall'
const apiGetAllBook = '/api/admin/book/allbook'
export {
    apiSignup,
    apiLogin,
    apiGetAllCatAndSubCat,
    apiGetDetailBookById,
    apiGetRatingByBookId,
    apiUpdateRating,
    apiInsertRating,
    apiCheckFavoriteBook,
    apiInsertFavoriteBook,
    apiDeleteFavoriteBook,
    apiGetRelatedBooks,
    apiGetListBookForOrder,
    apiOrderBook,
    apiGetAllOrder,
    apiGetAllBook,
}