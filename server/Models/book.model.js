var dbConn = require('../config/db.config');

var Book = function (book) {
    this.bookId = book.bookId;
}

// get all user
Book.getAllBooks = (result) => {
    dbConn.query(`Select * from books`, (err, res) => {
        result(err, res);
    });
}

module.exports = Book;
