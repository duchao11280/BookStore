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
                message: "Thêm thể loại thành công"
            });

        } else {
            res.status(500).json({
                statusCode: 500,
                message: "Thêm thể loại thất bại"
            });

        }
    } catch (error) {
        await db.rollback(conn)
        res.status(500).json({
            statusCode: 500,
            message: "Có lỗi xảy ra, Thêm thể loại thất bại"
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
                message: "Chỉnh sửa tên thể loại thành công"
            });
        } else {
            res.status(500).json({
                statusCode: 500,
                message: "Chỉnh sửa tên thể loại thất bại"
            });
        }

    } catch (error) {
        db.rollback(conn)
        res.json({
            statusCode: 500,
            message: "Có lỗi xảy ra, chỉnh sửa tên thể loại thất bại"
        });
    }
    db.releaseConnection(conn)
    return;
}
async function disableCat(req, res) {
    let conn = await db.getConnection();
    try {
        let catId = req.params.id
        let query = `UPDATE categories set isDisable = 1 Where catId = ?
            `
        conn = await db.beginTransaction(conn);
        const result = await db.queryTransaction(conn, query, [catId]);
        if (result) {
            let queryDisableSubCatByCatId = `UPDATE subcategories set isDisable = 1 Where catId = ?`
            const resultDisableSubCat = await db.queryTransaction(conn, queryDisableSubCatByCatId, [catId]);
            if (resultDisableSubCat) {
                let querySelectBookIdByCatId = `SELECT s.subCatId
                FROM categories c LEFT JOIN subcategories s on c.catId = s.catId 
                WHERE  c.catId = ?`
                const resultSelectSubCat = await db.queryTransaction(conn, querySelectBookIdByCatId, [catId]);
                resultSelectSubCat.forEach(async (item) => {
                    let queryDisableBookBySubCat = `UPDATE books set isDisable = 1 Where subCatId = ?`
                    const resultDisableBook = await db.queryTransaction(conn, queryDisableBookBySubCat, [item.subCatId]);
                    if (!resultDisableBook) {
                        db.rollback(conn)
                        res.status(500).json({
                            statusCode: 500,
                            message: "Xóa thể loại thất bại"
                        });
                    }
                })
            } else {
                db.rollback(conn)
                res.status(500).json({
                    statusCode: 500,
                    message: "Xóa thể loại thất bại"
                });
            }
            res.json({
                statusCode: 200,
                message: "Xóa thể loại thành công"
            });
        } else {
            db.rollback(conn)
            res.status(500).json({
                statusCode: 500,
                message: "Xóa thể loại thất bại"
            });
        }
        await db.commitTransaction(conn);
    } catch (error) {
        db.rollback(conn)
        res.json({
            statusCode: 500,
            message: "Có lỗi xảy ra, Xóa thể loại thất bại"
        });
    }
    db.releaseConnection(conn)
    return;
}

//===========================SubCategory======================
async function insertSubCategory(req, res) {
    let conn = await db.getConnection();
    try {
        let catId = req.params.id;
        let subCatName = req.body.subCatName;
        let query = `INSERT INTO subcategories(subCatName, catId) VALUES (?,?)`
        conn = await db.beginTransaction(conn);
        const result = await db.queryTransaction(conn, query, [subCatName, catId]);
        await db.commitTransaction(conn);
        if (result) {
            res.status(200).json({
                statusCode: 200,
                message: "Thêm thể loại con thành công"
            });

        } else {
            res.status(500).json({
                statusCode: 500,
                message: "Thêm thể loại con thất bại"
            });

        }
    } catch (error) {
        await db.rollback(conn)
        res.status(500).json({
            statusCode: 500,
            message: "Có lỗi xảy ra, Thêm thể loại con thất bại"
        });

    }
    db.releaseConnection(conn)
    return;
}
async function updateSubCatName(req, res) {
    let conn = await db.getConnection();
    try {
        let subCatId = req.params.id
        let subCatName = req.body.subCatName;

        let query = `UPDATE subcategories set subCatName =? Where subCatId = ?`
        conn = await db.beginTransaction(conn);
        const result = await db.queryTransaction(conn, query, [subCatName, subCatId]);
        await db.commitTransaction(conn);

        if (result) {
            res.json({
                statusCode: 200,
                message: "Chỉnh sửa tên thể loại con thành công"
            });
        } else {
            res.status(500).json({
                statusCode: 500,
                message: "Chỉnh sửa tên thể loại con thất bại"
            });
        }

    } catch (error) {
        db.rollback(conn)
        res.json({
            statusCode: 500,
            message: "Có lỗi xảy ra, chỉnh sửa tên thể loại con thất bại"
        });
    }
    db.releaseConnection(conn)
    return;
}



async function disableSubCat(req, res) {
    let conn = await db.getConnection();
    try {
        let subCatId = req.params.id
        let query = `UPDATE subcategories set isDisable = 1 Where subCatId = ?`
        conn = await db.beginTransaction(conn);
        const result = await db.queryTransaction(conn, query, [subCatId]);
        if (result) {
            let queryDisableBookBySubCat = `UPDATE books set isDisable = 1 Where subCatId = ?`
            const resultDisableBook = await db.queryTransaction(conn, queryDisableBookBySubCat, [subCatId]);
            if (resultDisableBook) {
                res.json({
                    statusCode: 200,
                    message: "Xóa thể loại con thành công"
                });
            } else {
                db.rollback(conn)
                res.status(500).json({
                    statusCode: 500,
                    message: "Xóa thể loại con thất bại"
                });
            }
        }
        else {
            db.rollback(conn)
            res.status(500).json({
                statusCode: 500,
                message: "Xóa thể loại con thất bại"
            });
        }
        await db.commitTransaction(conn);
    } catch (error) {
        db.rollback(conn)
        res.json({
            statusCode: 500,
            message: "Có lỗi xảy ra, Xóa thể loại con thất bại"
        });
    }
    db.releaseConnection(conn)
    return;
}
module.exports = {
    getAllCatAndSubCat,
    insertCategory,
    updateCatName,
    insertSubCategory,
    updateSubCatName,
    disableSubCat,
    disableCat
}