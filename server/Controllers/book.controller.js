const db = require('../utls/database')
exports.getAllBooks = async (req, res) => {
    try {
        const result = await db.exeQuery(`Select * from books`);
        return res.status(200).json({ message: "Lấy dữ liệu thành công", data: result });
    } catch (error) {
        return res.status(500).json({ message: "Thất bại", data: error });
    }

}

exports.getDetailBookByID = async (req, res) => {

    try {
        let bookId = req.params.id;
        const query = `Select DISTINCT * from books where bookId = ?`
        const result = await db.exeQuery(query, [bookId]);
        if (result.length === 0) {
            res.status(402).json({ message: "Không có dữ liệu", statusCode: 402, data: [] });
            return;
        }
        result[0].thumbnailsUrl = process.env.DOMAIN_SERVER + '/public/images/' + result[0].thumbnails
        return res.status(200).json({ message: "Lấy dữ liệu thành công", statusCode: 200, data: result });
    } catch (error) {
        return res.status(500).json({ message: "Thất bại", statusCode: 500, data: error });
    }

}
exports.getBookByListId = async (req, res) => {
    try {
        let arrbookId = req.params.arrId
        arrbookId = arrbookId.replace(/-/g, ",");
        const query = `Select * from books where bookId in (${arrbookId}) and quantity >0 and isDisable =0`
        const result = await db.exeQuery(query, []);
        if (result.length === 0) {
            res.status(402).json({ message: "Không có dữ liệu", statusCode: 402, data: [] });
            return;
        }
        result.forEach(element => {
            element.thumbnailsUrl = process.env.DOMAIN_SERVER + '/public/images/' + element.thumbnails
        });
        return res.status(200).json({ message: "Lấy dữ liệu thành công", statusCode: 200, data: result });
    } catch (error) {
        return res.status(500).json({ message: "Thất bại", statusCode: 500, data: error });
    }

}


exports.getRelatedBooks = async (req, res) => {
    try {
        let bookId = req.params.bookid;
        let subCatId = req.params.subcatid;
        const query = `SELECT books.*, avgRate,numberOfRate
            from books LEFT JOIN (Select bookId, avg(rate) as avgRate, count(bookId) as numberOfRate
                                    FROM rating
                                    GROUP BY bookId) as rateTable ON books.bookId = rateTable.bookId
            WHERE books.bookId!= ? and books.subCatId = ? and books.isDisable!=1
            ORDER BY createAt LIMIT 10;`
        const result = await db.exeQuery(query, [bookId, subCatId]);
        if (result.length === 0) {
            res.status(402).json({ message: "Không có dữ liệu", statusCode: 402, data: [] });
            return;
        }
        result.forEach(element => {
            element.thumbnailsUrl = process.env.DOMAIN_SERVER + '/public/images/' + element.thumbnails
        });
        return res.status(200).json({ message: "Lấy dữ liệu thành công", statusCode: 200, data: result });
    } catch (error) {
        return res.status(500).json({ message: "Thất bại", statusCode: 500, data: error });
    }
}