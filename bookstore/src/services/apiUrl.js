const apiSignup = "/api/user/signup";
const apiLogin = "/api/user/login";
const apiGetAllCatAndSubCat = "/api/category/getall";
const apiGetDetailBookById = '/api/book/'
const apiGetRatingByBookId = '/api/rating/bybook/'
const apiUpdateRating = '/api/rating/update/book/'
const apiInsertRating = '/api/rating/rate/book/'
const apiGetHotCategory = '/api/category/gethot';
const apiGetBestSellerBook = '/api/book/getbestseller';
const apiGetNewBook = '/api/book/getnew';
const apiGetHotBook = '/api/book/gethot';
const apiGetSaleBook = '/api/book/getsale';
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
const apiInsertCategory = '/api/category/insertcat'
const apiUpdateCategory = '/api/category/updatecatname/'
const apiInsertSubCategory = '/api/category/insertsubcat/'
const apiUpdateSubCategory = '/api/category/updatesubcatname/'
const apiDisableCategory = '/api/category/disable/cat/'
const apiDisableSubCategory = '/api/category/disable/subcat/'
const apiGetAllOrder = '/api/admin/order/getall'
const apiGetAllBook = '/api/admin/book/allbook'

const apiGetAllCategory = '/api/category/getallcat';
const apiGetAllSubCatByCat = '/api/category/getallsubcat'

const apiDeleteBook = '/api/admin/book/delete/'

const apiGetDetailOrderById = '/api/admin/order/'

const apigetDetailSumOfPriceById = '/api/admin/detailorder/'

const apiAcceptOrder = '/api/admin//order/updatestatus'

const apiInsertBook = '/api/admin/book/add'


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
    apiInsertCategory,
    apiUpdateCategory,
    apiInsertSubCategory,
    apiUpdateSubCategory,
    apiDisableCategory,
    apiDisableSubCategory,
    apiGetHotCategory,
    apiGetBestSellerBook,
    apiGetHotBook,
    apiGetNewBook,
    apiGetSaleBook,
    apiGetAllOrder,
    apiGetAllBook,
    apiGetAllCategory,
    apiGetAllSubCatByCat,
    apiDeleteBook,
    apiGetDetailOrderById,
    apigetDetailSumOfPriceById,
    apiAcceptOrder,
    apiInsertBook
}