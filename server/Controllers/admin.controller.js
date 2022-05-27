const db = require('../utls/database')

// exports.disableBookByBookId = async (req, res) => {
//     try {
//         const id = req.params.id;
//         let conn = await db.getConnection();
//         conn = await db.beginTransaction(conn);
//         const query = `Update books set isDisable = 1 Where bookId = ?`
//         const result = await db.queryTransaction(conn, query, [id]);
//         conn = await db.commitTransaction(conn);
//         res.status(200).json({ message: "Xóa dữ liệu thành công" });
//     } catch (error) {
//         res.status(500).json({ message: "Thất bại", data: error });
//     }
// }

exports.getAllBook = async (req, res) => {
    try {
        const id = req.body.id;
        const query = `select * from books where isDisable =0`
        const result = await db.exeQuery(query, [id]);
        res.status(200).json({ message: "lấy dữ liệu thành công", data: result });
    } catch (error) {
        res.status(500).json({ message: "Thất bại", data: error });
    }
}

exports.disableBookByBookId = async (req, res) => {
    let conn = await db.getConnection();
    try {
        const id = req.body.id;
        conn = await db.beginTransaction(conn);
        const query = `update books set isDisable =1 where bookId=?`
        const result = await db.queryTransaction(conn, query, [id]);
        conn = await db.commitTransaction(conn);
        res.status(200).json({ message: "Xóa dữ liệu thành công" });
    } catch (error) {
        await db.rollback(conn);
        res.status(500).json({ message: "Thất bại", data: error });
    }
    db.releaseConnection(conn);
}

exports.updateBookByBookId = async (req, res) => {
    let conn = await db.getConnection();
    try {
        const id = req.body.id;
        conn = await db.beginTransaction(conn);
        const query = 'update books set bookName=?, auth=?, description=?, year=?,' +
            'nxb=?, quantity=?, subCatID=?, thumbnails=?, price=?, sale=? where bookId=?, '
        const result = await db.queryTransaction(conn, query, [id]);
        conn = await db.commitTransaction(conn);
        res.status(200).json({ message: "Cập nhật dữ liệu thành công", data: result });
    } catch (error) {
        await db.rollback(conn);
        res.status(500).json({ message: "Thất bại", data: error });
    }
    db.releaseConnection(conn);
}

exports.updateOrderStatusbyId = async (req, res) => {
    let conn = await db.getConnection();
    try {
        const { status, orderId } = req.body;
        conn = await db.beginTransaction(conn);
        const query = 'UPDATE orders SET status =? where orderId = ?'
        const result = await db.queryTransaction(conn, query, [status, orderId]);
        const query2 = 'Select * from orderdetails where orderId = ?'
        const resultListBook = await db.queryTransaction(conn, query2, [orderId]);
        if (resultListBook.length && status == 1) {
            for (let i = 0; i < resultListBook.length; i++) {
                const book = resultListBook[i];
                const query3 = 'UPDATE books  Set quantity = quantity -? WHERE bookId=?'
                const reduceBook = await db.queryTransaction(conn, query3, [book.number, book.bookId])
            }
        }
        else if (resultListBook.length && status == 3) {
            for (let i = 0; i < resultListBook.length; i++) {
                const book = resultListBook[i];
                const query3 = 'UPDATE books  Set quantity = quantity +? WHERE bookId=?'
                const reduceBook = await db.queryTransaction(conn, query3, [book.number, book.bookId])
            }
        }
        conn = await db.commitTransaction(conn);
        if (status == 1) {
            res.status(200).json({ message: "Duyệt đơn hàng thành công" });
        }
        else if (status == 2) {
            res.status(200).json({ message: "Từ chối đơn hàng thành công" });
        }
        else if (status == 3) {
            res.status(200).json({ message: "Giao đơn hàng thất bại" });
        }
        else {
            res.status(200).json({ message: "Giao đơn hàng thành công" });
        }

    } catch (error) {
        await db.rollback(conn);
        res.status(500).json({ message: "Thất bại", data: error });
    }
    db.releaseConnection(conn);
}


// exports.updateOrderStatusbyId = async (req, res) => {
//     let conn = await db.getConnection();
//     try {
//         const id = req.params.id;
//         conn = await db.beginTransaction(conn);
//         const query = 'UPDATE orders SET status =1 where orderId = ?'
//         const result = await db.queryTransaction(conn, query, [id]);
//         const query2 = 'Select * from orderdetails where orderId = ?'
//         const resultListBook = await db.queryTransaction(conn, query2, [id]);
//         if (resultListBook.length) {
//             for (let i = 0; i < resultListBook.length; i++) {
//                 const book = resultListBook[i];
//                 const query3 = 'UPDATE books  Set quantity = quantity -? WHERE bookId=?'
//                 const reduceBook = await db.queryTransaction(conn, query3, [book.number, book.bookId])
//             }
//         }
//         conn = await db.commitTransaction(conn);
//         res.status(200).json({ message: "Duyệt đơn hàng thành công" });
//     } catch (error) {
//         await db.rollback(conn);
//         res.status(500).json({ message: "Thất bại", data: error });
//     }
//     db.releaseConnection(conn);
// }


exports.cancelOrderbyId = async (req, res) => {
    let conn = await db.getConnection();
    try {
        const id = req.params.id;
        conn = await db.beginTransaction(conn);
        const query = 'UPDATE orders SET status =2 where orderId = ?'
        const result = await db.queryTransaction(conn, query, [id]);
        conn = await db.commitTransaction(conn);
        res.status(200).json({ message: "Hủy đơn hàng thành công" });
    } catch (error) {
        await db.rollback(conn);
        res.status(500).json({ message: "Thất bại", data: error });
    }
    db.releaseConnection(conn);
}


exports.addBookByBookId = async (req, res) => {
    let conn = await db.getConnection();
    try {
        const { bookName, auth, description, language, year, nxb, price, quantity, subCatId, sale, coverImg, thumbnails } = req.body;
        conn = await db.beginTransaction(conn);
        const query = 'insert into books (bookName, auth, description, language, year, nxb, price, quantity, subCatId, sale, coverImg, thumbnails   ) values(?,?,?,?,?,?,?,?,?,?,?,?) '
        const result = await db.queryTransaction(conn, query, [bookName, auth, description, language, year, nxb, price, quantity, subCatId, sale, coverImg, thumbnails]);
        conn = await db.commitTransaction(conn);
        res.status(200).json({ message: "Thêm dữ liệu thành công", });
    } catch (error) {
        await db.rollback(conn);
        res.status(500).json({ message: "Thất bại", data: error });
    }
    db.releaseConnection(conn);
}


exports.getAllOrder = async (req, res) => {
    try {

        const query = "SELECT orders.orderId, phone, fullName, `status`, sum(orderdetails.price * orderdetails.number ) as sumPrice" +
            " from orders INNER JOIN orderdetails on orders.orderId = orderdetails.orderId" +
            " GROUP BY orders.orderId, phone, fullName, `status` ";
        const result = await db.exeQuery(query);
        res.status(200).json({ message: "lấy dữ liệu thành công", data: result });
    } catch (error) {
        res.status(500).json({ message: "Thất bại", data: error });
    }
}

exports.getTotalPriceOfOrderById = async (req, res) => {
    try {
        let orderId = req.params.id;
        const query = "SELECT orders.orderId, phone, fullName, `status`, sum(orderdetails.price * orderdetails.number ) as sumPrice" +
            " from orders INNER JOIN orderdetails on orders.orderId = orderdetails.orderId" +
            " where orders.orderId=? " +
            " GROUP BY orders.orderId, phone, fullName, `status` ";
        const result = await db.exeQuery(query, [orderId]);
        console.log(orderId);
        res.status(200).json({ message: "lấy dữ liệu thành công", data: result });
    } catch (error) {
        res.status(500).json({ message: "Thất bại", data: error });
    }
}


exports.getOrderByID = async (req, res) => {

    try {
        let orderId = req.params.id;
        const query = `Select DISTINCT * from orders where orderId = ?`
        const result = await db.exeQuery(query, [orderId]);
        if (result.length === 0) {
            res.status(402).json({ message: "Không có dữ liệu", statusCode: 402, data: [] });
            return;
        }
        // result[0].thumbnailsUrl = process.env.DOMAIN_SERVER + '/public/images/' + result[0].thumbnails
        return res.status(200).json({ message: "Lấy dữ liệu thành công", statusCode: 200, data: result });
    } catch (error) {
        return res.status(500).json({ message: "Thất bại", statusCode: 500, data: error });
    }

}

exports.getDetailOrderByID = async (req, res) => {

    try {
        let orderId = req.params.id;
        const query = `Select DISTINCT * from orders where orderId = ?`
        const result = await db.exeQuery(query, [orderId]);
        if (result.length === 0) {
            res.status(402).json({ message: "Không có dữ liệu", statusCode: 402, data: [] });
            return;
        }
        // result[0].thumbnailsUrl = process.env.DOMAIN_SERVER + '/public/images/' + result[0].thumbnails
        return res.status(200).json({ message: "Lấy dữ liệu thành công", statusCode: 200, data: result });
    } catch (error) {
        return res.status(500).json({ message: "Thất bại", statusCode: 500, data: error });
    }

}


