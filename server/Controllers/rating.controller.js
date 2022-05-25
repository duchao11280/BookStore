const db = require('../utls/database')

exports.getAllRatingOfBookId = async (req, res) => {
    try {
        let bookId = req.params.id;
        const query = `SELECT r.rateId, r.userId, r.rate, r.content, 
                r.updateAt, u.fullName 
            from rating as r LEFT JOIN users as u ON r.userId = u.userId
            WHERE r.bookId =  ?`
        const result = await db.exeQuery(query, [bookId]);
        if (result.length === 0) {
            res.status(402).json({ message: "Không có đánh giá", statusCode: 402, data: [], avgRating: 0 });
            return;
        }
        const queryAVG = `SELECT AVG(rate) as avgRating
            from rating 
            WHERE bookId = ?`
        const avgRating = await db.exeQuery(queryAVG, [bookId]);

        return res.status(200).json({ message: "Lấy dữ liệu thành công", statusCode: 200, data: result, avgRating: parseFloat(Object.values(avgRating[0])) });
    } catch (error) {
        return res.status(500).json({ message: "Thất bại", statusCode: 500, data: [], avgRating: 0 });
    }
}
exports.insertRating = async (req, res) => {
    let conn = await db.getConnection();
    try {
        let bookId = req.params.id;
        let userId = req.body.userId;
        let rate = req.body.rate;
        let content = req.body.content;
        if (await checkExistRating(userId, bookId)) {
            res.json({
                statusCode: 402,
                message: "Bạn đã đánh giá sách này!"
            });
            return;
        }
        let query = `INSERT INTO rating(bookId, userId, rate, content) VALUES (?,?,?,?)`
        conn = await db.beginTransaction(conn);
        const result = await db.queryTransaction(conn, query, [bookId, userId, rate, content]);
        await db.commitTransaction(conn);
        if (result) {
            res.status(200).json({
                statusCode: 200,
                message: "Đánh giá thành công"
            });

        } else {
            res.status(500).json({
                statusCode: 500,
                message: "Đánh giá thất bại"
            });

        }
    } catch (error) {
        await db.rollback(conn)
        res.status(500).json({
            statusCode: 500,
            message: "Có lỗi xảy ra, đánh giá thất bại"
        });

    }
    db.releaseConnection(conn)
    return;
}
exports.updateRating = async (req, res) => {
    let conn = await db.getConnection();
    try {
        let bookId = req.params.id;
        let userId = req.body.userId;
        let rate = req.body.rate;
        let content = req.body.content;
        if (await checkExistRating(userId, bookId)) {

            let query = `UPDATE rating set rate =? , content = ? Where bookId = ? and userId =?`
            conn = await db.beginTransaction(conn);
            const result = await db.queryTransaction(conn, query, [rate, content, bookId, userId]);
            await db.commitTransaction(conn);

            if (result) {
                res.json({
                    statusCode: 200,
                    message: "Chỉnh sửa đánh giá thành công"
                });
            } else {
                res.status(500).json({
                    statusCode: 500,
                    message: "Đánh giá thất bại"
                });
            }
        } else {
            res.json({
                statusCode: 402,
                message: "Đánh giá không tồn tại!"
            });
        }
    } catch (error) {
        db.rollback(conn)
        res.json({
            statusCode: 500,
            message: "Có lỗi xảy ra, chỉnh sửa đánh giá thất bại"
        });
    }
    db.releaseConnection(conn)
    return;
}

async function checkExistRating(userId, bookId) {
    try {
        const query = "SELECT * FROM rating WHERE userId = ? and bookId = ?";
        const result = await db.exeQuery(query, [userId, bookId]);
        return result.length ? true : false;
    } catch (error) {
        throw (error);
    }
}