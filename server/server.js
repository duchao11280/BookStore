const app = require('./app')
let dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Node server running @ http://localhost:${port}`)
});