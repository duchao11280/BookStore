const app = require('./app')
let dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 1188;

app.listen(port, function () {
    console.log(`Node server running @ http://localhost:${port}`)
});