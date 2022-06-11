const db = require('../utls/database')

exports.insertOrder = async (req, res) => {
    let conn = await db.getConnection();
    try {
        let phone = req.body.phone;
        let fullName = req.body.fullName;
        let address = req.body.address;
        let listOrder = req.body.listOrder;
        let arrayBookId = [];
        listOrder.forEach((item) => {
            arrayBookId.push(item.bookId)
        })
        const queryBookForOrder = `Select books.*, CAST((price)*(sale) as INT) as finalPrice from books where bookId in (${arrayBookId}) and isDisable =0`
        const bookForOrder = await db.exeQuery(queryBookForOrder, []);
        if (bookForOrder.length === 0 && bookForOrder.length !== arrayBookId.length) {
            res.status(402).json({ message: "Sách không có sẵn!", statusCode: 204, data: [] });
            return;
        }

        listOrder.forEach((item) => {
            bookForOrder.forEach((bookorder) => {
                if (bookorder.bookId === item.bookId) {
                    item.finalPrice = bookorder.finalPrice
                }
            })
        })

        let queryInsertOrder = `INSERT INTO orders(phone, fullName, address) VALUES (?,?,?)`
        conn = await db.beginTransaction(conn);
        const insertOrder = await db.queryTransaction(conn, queryInsertOrder, [phone, fullName, address]);

        if (insertOrder) {
            let orderId = await insertOrder.insertId;
            let queryInsertOrderDetail = `INSERT INTO orderdetails(orderId, bookId, price, number) VALUES (?,?,?,?)`
            listOrder.forEach(async (orderDetail) => {
                const insertOrderDetail = await db.queryTransaction(conn, queryInsertOrderDetail, [orderId, orderDetail.bookId, orderDetail.finalPrice, orderDetail.quantityOrder]);
                if (!insertOrderDetail) {
                    await db.rollback(conn)
                    res.status(500).json({
                        statusCode: 500,
                        message: "Có lỗi xảy ra, đặt hàng thất bại"
                    });
                    return;
                }
            })
            await db.commitTransaction(conn);
            res.status(200).json({
                statusCode: 200,
                message: "Đặt hàng thành công"
            });

        } else {
            await db.rollback(conn)
            res.status(500).json({
                statusCode: 500,
                message: "Đặt hàng thất bại"
            });

        }
    } catch (error) {
        await db.rollback(conn)
        res.status(500).json({
            statusCode: 500,
            message: "Có lỗi xảy ra, đặt hàng thất bại"
        });

    }
    db.releaseConnection(conn)
    return;
}

exports.getAllOrderByPhone = async (req, res) => {
    try {
        let phone = req.params.phone;
        const query = `SELECT orderdetails.*, books.bookName, orders.status, orders.address
        FROM orders, orderdetails, books
        WHERE orders.orderId = orderdetails.orderId and books.bookId = orderdetails.bookId and orders.phone = ?`
        const result = await db.exeQuery(query, [phone]);
        if (result.length === 0) {
            res.status(200).json({ message: "Không có dữ liệu", statusCode: 200, data: [] });
            return;
        }
        return res.status(200).json({ message: "Lấy dữ liệu thành công", statusCode: 200, data: result });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Thất bại", statusCode: 500, data: error });
    }
}