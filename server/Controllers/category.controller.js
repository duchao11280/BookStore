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

module.exports = {
    getAllCatAndSubCat
}