const db = require('../utls/database')

const checkExistFavorited = async (userId, bookId) => {
    try {

        const query = `Select * from favoritelist Where userId = ? and bookId = ?`
        const result = await db.exeQuery(query, [userId, bookId]);
        return result.length ? true : false;
    } catch (error) {
        console.log(error);
        throw (error);
    }
}
exports.checkFavorited = async (req, res) => {
    try {
        let userId = req.params.userid
        let bookId = req.params.bookid
        if (await checkExistFavorited(userId, bookId)) {
            res.status(200).json({ message: "Đã yêu thích", statusCode: 200, isFavorited: true });
            return;
        }
        return res.status(200).json({ message: "Chưa yêu thích", statusCode: 200, isFavorited: false });
    } catch (error) {
        return res.status(500).json({ message: "Thất bại", statusCode: 500, isFavorited: false });

    }
}
exports.insertFavorite = async (req, res) => {
    let conn = await db.getConnection();
    try {
        let userId = req.body.userId
        let bookId = req.params.bookid
        if (await checkExistFavorited(userId, bookId)) {
            res.json({
                statusCode: 409,
                message: "Bạn đã thích sách này!"
            });
            return;
        }
        let query = `INSERT INTO favoritelist(bookId, userId) VALUES (?,?)`
        conn = await db.beginTransaction(conn);
        const result = await db.queryTransaction(conn, query, [bookId, userId]);
        await db.commitTransaction(conn);
        if (result) {
            res.status(200).json({
                statusCode: 200,
                message: "Yêu thích thành công"
            });

        } else {
            res.status(500).json({
                statusCode: 500,
                message: "Yêu thích thất bại"
            });

        }
    } catch (error) {
        await db.rollback(conn)
        res.status(500).json({
            statusCode: 500,
            message: "Có lỗi xảy ra, yêu thích thất bại"
        });

    }
    db.releaseConnection(conn)
    return;
}
exports.deleteFavorite = async (req, res) => {
    let conn = await db.getConnection();
    try {
        let userId = req.params.userid
        let bookId = req.params.bookid
        if (await checkExistFavorited(userId, bookId)) {

            let query = `DELETE FROM favoritelist Where bookId = ? and userId =?`
            conn = await db.beginTransaction(conn);
            const result = await db.queryTransaction(conn, query, [bookId, userId]);
            await db.commitTransaction(conn);

            if (result) {
                res.json({
                    statusCode: 200,
                    message: "Bỏ thích thành công"
                });
            } else {
                res.status(500).json({
                    statusCode: 500,
                    message: "Thất bại"
                });
            }
        } else {
            res.json({
                statusCode: 404,
                message: "Bạn chưa thích sách này!"
            });
        }
    } catch (error) {
        db.rollback(conn)
        res.json({
            statusCode: 500,
            message: "Có lỗi xảy ra, vui lòng thử lại sau"
        });
    }
    db.releaseConnection(conn)
    return;
}