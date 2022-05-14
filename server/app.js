let express = require('express');
let app = express();
let path = require('path');

const cors = require('cors');
let cookieParser = require('cookie-parser')

global.__basedir = __dirname;
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({
    extended: true
}));
// IP của client
app.use(cors({ credentials: true, origin: ["http://192.168.1.4:4000", "http://10.0.132.51:4000"] }));

app.get('/', function (req, res) {
    return res.send({ messenger: 'Book Store API' })
});
app.get('/public/images/:filename', (req, res) => {
    res.sendFile(path.join(__dirname, './public/image', req.params.filename))
})

// import route
const bookRoutes = require('./Routes/book.route')
const adminRoutes = require('./Routes/admin.route')

// use route
app.use('/api/book',bookRoutes)
app.use('/api/admin', adminRoutes)

module.exports = app;