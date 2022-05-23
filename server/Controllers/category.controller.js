const db = require('../utls/database');

async function getAllCatAndSubCat(req, res) {
    try {
        const query =
            'SELECT catName, c.catId, subCatName, subCatId ' +
            'FROM categories c INNER JOIN subcategories s on c.catId = s.catId ' +
            'WHERE c.isDisable = 0 and s.isDisable = 0 '
        const result = await db.exeQuery(query, []);
        res.json({
            statusCode: 200,
            message: "Lấy dữ liệu thành công",
            data: result
        });
        return;
    } catch (ex) {
        res.json({
            statusCode: 500,
            message: "Có lỗi xảy ra, lấy dữ liệu thất bại",
            data: []
        });
        return;
    }
}

async function getHotCategory(req, res) {
    try {
        const query =
            'SELECT c.catId, catName, c.thumbnails, count(fl.bookId) as favoriteNumber ' +
            'FROM categories c  ' +
            '	INNER JOIN subcategories s ON c.catId = s.catId ' +
            '	INNER JOIN books b ON s.subCatId = b.subCatId ' +
            '	LEFT JOIN favoritelist fl ON b.bookId = fl.bookId ' +
            'WHERE b.isDisable = 0 ' +
            'GROUP BY catId, catName, thumbnails ' +
            'ORDER BY favoriteNumber desc; ';
        const result = await db.exeQuery(query, []);
        res.json({
            statusCode: 200,
            message: "Lấy dữ liệu thành công",
            data: result
        });
        return;
    } catch (error) {
        res.json({
            statusCode: 500,
            message: "Có lỗi xảy ra, lấy dữ liệu thất bại",
            data: []
        });
        return;
    }
}

module.exports = {
    getAllCatAndSubCat,
    getHotCategory
}