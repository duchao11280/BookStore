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
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");// update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
   next();
 });
// IP của client
app.use(cors({ credentials: true, origin: ["http://192.168.1.4:4000", "http://10.0.132.51:4000"] }));

app.get('/', function (req, res) {
    return res.send({ messenger: 'Book Store API' })
});
app.get('/public/images/:filename', (req, res) => {
    res.sendFile(path.join(__dirname, './public/image', req.params.filename))
})

// import route
const bookRoutes = require('./Routes/book.route');
const adminRoutes = require('./Routes/admin.route');
const userRoutes = require('./Routes/user.route');
const categoryRoutes = require('./Routes/category.route');

// use route
app.use('/api/book', bookRoutes)
    .use('/api/admin', adminRoutes)
    .use('/api/user', userRoutes)
    .use('/api/category', categoryRoutes)

module.exports = app;