const mysql = require('mysql');

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bookstore',
});

dbConn.connect(function(error){
    if(error) {console.log("fail"); return;};
    console.log('Database connected successfully!')
});

module.exports = dbConn;