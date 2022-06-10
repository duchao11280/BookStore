const { exeQuery } = require('../utls/database');
const db = require('../utls/database');
exports.getAllBooks = async (req, res) => {
    try {
        const query =
            'SELECT b.*, c.catId, r.rate, c.catName ' +
            'FROM books b ' +
            '    INNER JOIN subcategories s ON b.subCatId = s.subCatId ' +
            '    INNER JOIN categories c ON c.catId = s.catId ' +
            '    LEFT JOIN (SELECT bookId, AVG(rate) as rate ' +
            '                            FROM rating ' +
            '                            GROUP BY bookId) as r ON b.bookId = r.bookId ' +
            'WHERE b.isDisable = 0 ';
        const result = await exeQuery(query, []);
        res.status(200).json({ message: "Lấy dữ liệu thành công", data: result });
    } catch (error) {
        res.status(500).json({ message: "Thất bại", data: error });
    }

}

exports.getBestSeller = async (req, res) => {
    try {
        const query =
            'SELECT rb.*, r.rate, lb.numberOrder ' +
            'FROM books rb ' +
            '   INNER JOIN (SELECT b.bookId, COUNT(o.bookId) as numberOrder ' +
            '	    FROM books b LEFT JOIN orderdetails o on o.bookId = b.bookId ' +
            '	    GROUP BY b.bookId ' +
            '	    ORDER BY numberOrder asc) lb ON rb.bookId = lb.bookId ' +
            '   LEFT JOIN (SELECT bookId, AVG(rate) as rate ' +
            '	    FROM rating ' +
            'GROUP BY bookId) as r ON rb.bookId = r.bookId ' +
            'WHERE rb.isDisable = 0 ' +
            'LIMIT 8; ';
        const result = await exeQuery(query, []);
        res.json({
            statusCode: 200,
            message: "Lấy dữ liệu thành công",
            data: result
        });
    } catch (error) {
        console.log(error);
        res.json({
            statusCode: 500,
            message: "Lấy dữ liệu thất bại",
        });
    }
}

exports.getNewestBook = async (req, res) => {
    try {
        const query =
            'SELECT rb.*, r.rate, lb.numberOrder ' +
            'FROM books rb ' +
            '   INNER JOIN (SELECT b.bookId, COUNT(o.bookId) as numberOrder ' +
            '	    FROM books b LEFT JOIN orderdetails o on o.bookId = b.bookId ' +
            '	    GROUP BY b.bookId ) lb ON rb.bookId = lb.bookId ' +
            '   LEFT JOIN (SELECT bookId, AVG(rate) as rate ' +
            '	    FROM rating ' +
            'GROUP BY bookId) as r ON rb.bookId = r.bookId ' +
            'WHERE rb.isDisable = 0 ' +
            'ORDER BY createAt desc ' +
            'LIMIT 8; ';
        const result = await exeQuery(query, []);
        res.json({
            statusCode: 200,
            message: "Lấy dữ liệu thành công",
            data: result
        });
    } catch (error) {
        console.log(error);
        res.json({
            statusCode: 500,
            message: "Lấy dữ liệu thất bại",
        });
    }
}

exports.getHotestBook = async (req, res) => {
    try {
        const query =
            'SELECT rb.*, r.rate, lb.numberOrder ' +
            'FROM books rb ' +
            '   INNER JOIN (SELECT b.bookId, COUNT(o.bookId) as numberOrder ' +
            '	    FROM books b LEFT JOIN orderdetails o on o.bookId = b.bookId ' +
            '	    GROUP BY b.bookId ) lb ON rb.bookId = lb.bookId ' +
            '   LEFT JOIN (SELECT bookId, AVG(rate) as rate ' +
            '	    FROM rating ' +
            'GROUP BY bookId) as r ON rb.bookId = r.bookId ' +
            'WHERE rb.isDisable = 0 ' +
            'ORDER BY rate desc ' +
            'LIMIT 3; ';
        const result = await exeQuery(query, []);
        res.json({
            statusCode: 200,
            message: "Lấy dữ liệu thành công",
            data: result
        });
    } catch (error) {
        console.log(error);
        res.json({
            statusCode: 500,
            message: "Lấy dữ liệu thất bại",
        });
    }
}

exports.getSaleBook = async (req, res) => {
    try {
        const query =
            'SELECT rb.*, r.rate, lb.numberOrder ' +
            'FROM books rb ' +
            '   INNER JOIN (SELECT b.bookId, COUNT(o.bookId) as numberOrder ' +
            '	    FROM books b LEFT JOIN orderdetails o on o.bookId = b.bookId ' +
            '	    GROUP BY b.bookId ) lb ON rb.bookId = lb.bookId ' +
            '   LEFT JOIN (SELECT bookId, AVG(rate) as rate ' +
            '	    FROM rating ' +
            'GROUP BY bookId) as r ON rb.bookId = r.bookId ' +
            'WHERE rb.isDisable = 0 ' +
            'ORDER BY rb.sale desc, createAt desc ' +
            'LIMIT 8; ';
        const result = await exeQuery(query, []);
        res.json({
            statusCode: 200,
            message: "Lấy dữ liệu thành công",
            data: result
        });
    } catch (error) {
        console.log(error);
        res.json({
            statusCode: 500,
            message: "Lấy dữ liệu thất bại",
        });
    }
}

exports.getDetailBookByID = async (req, res) => {

    try {
        let bookId = req.params.id;
        const query = `Select DISTINCT books.*, catId from books INNER JOIN subcategories ON books.subCatId = subcategories.subCatId  where bookId = ?`
        const result = await db.exeQuery(query, [bookId]);

        if (result.length === 0) {
            res.status(402).json({ message: "Không có dữ liệu", statusCode: 402, data: [] });
            return;
        }
        result[0].thumbnailsUrl = process.env.DOMAIN_SERVER + '/public/images/' + result[0].thumbnails
        result[0].coverUrl = process.env.DOMAIN_SERVER + '/public/images/' + result[0].coverImg

        return res.status(200).json({ message: "Lấy dữ liệu thành công", statusCode: 200, data: result });
    } catch (error) {
        console.log(error)
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
            res.status(204).json({ message: "Không có dữ liệu", statusCode: 204, data: [] });
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
