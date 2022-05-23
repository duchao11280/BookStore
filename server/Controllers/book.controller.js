const { exeQuery } = require('../utls/database')
exports.getAllBooks = async (req, res) => {
    try {
        const result = await exeQuery(`Select * from books`);
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
            'LIMIT 8; ';
        const result = await exeQuery(query, []);
        res.json({
            statusCode: 200,
            message: "Lấy dữ liệu thành công",
            data: result
        });
    } catch (error) {
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
            'ORDER BY createAt desc ' +
            'LIMIT 8; ';
        const result = await exeQuery(query, []);
        res.json({
            statusCode: 200,
            message: "Lấy dữ liệu thành công",
            data: result
        });
    } catch (error) {
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
            'ORDER BY rate desc ' +
            'LIMIT 8; ';
        const result = await exeQuery(query, []);
        res.json({
            statusCode: 200,
            message: "Lấy dữ liệu thành công",
            data: result
        });
    } catch (error) {
        res.json({
            statusCode: 500,
            message: "Lấy dữ liệu thất bại",
        });
    }
}

