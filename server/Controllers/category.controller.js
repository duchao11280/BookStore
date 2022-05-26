const db = require('../utls/database');

async function getAllCatAndSubCat(req, res) {
    try {
        const query =
            'SELECT catName, c.catId, subCatName, subCatId ' +
            'FROM categories c LEFT JOIN subcategories s on c.catId = s.catId ' +
            'WHERE c.isDisable = 0 and (s.isdisable = 0 or s.isdisable is null) '
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
async function insertCategory(req, res) {
    let conn = await db.getConnection();
    try {
        let catName = req.body.catName;
        let query = `INSERT INTO categories(catName) VALUES (?)`
        conn = await db.beginTransaction(conn);
        const result = await db.queryTransaction(conn, query, [catName]);
        await db.commitTransaction(conn);
        if (result) {
            res.status(200).json({
                statusCode: 200,
                message: "Thêm danh mục thành công"
            });

        } else {
            res.status(500).json({
                statusCode: 500,
                message: "Thêm danh mục thất bại"
            });

        }
    } catch (error) {
        await db.rollback(conn)
        res.status(500).json({
            statusCode: 500,
            message: "Có lỗi xảy ra, Thêm danh mục thất bại"
        });

    }
    db.releaseConnection(conn)
    return;
}
async function updateCatName(req, res) {
    let conn = await db.getConnection();
    try {
        let catId = req.params.id
        let catName = req.body.catName;
        let query = `UPDATE categories set catName =? Where catId = ?`
        conn = await db.beginTransaction(conn);
        const result = await db.queryTransaction(conn, query, [catName, catId]);
        await db.commitTransaction(conn);

        if (result) {
            res.json({
                statusCode: 200,
                message: "Chỉnh sửa tên danh mục thành công"
            });
        } else {
            res.status(500).json({
                statusCode: 500,
                message: "Chỉnh sửa tên danh mục thất bại"
            });
        }

    } catch (error) {
        db.rollback(conn)
        res.json({
            statusCode: 500,
            message: "Có lỗi xảy ra, chỉnh sửa tên danh mục thất bại"
        });
    }
    db.releaseConnection(conn)
    return;
}
module.exports = {
    getAllCatAndSubCat,
    insertCategory,
    updateCatName

}