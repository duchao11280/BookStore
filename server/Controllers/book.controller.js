const BookModel = require('../Models/book.model');

exports.getAllBooks = (req,res) =>{
    BookModel.getAllBooks((err,data) =>{
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        };
        res.json({ status: true, message: 'Lấy dữ liệu thành công', data: data })
    })
}