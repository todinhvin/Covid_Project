const express = require('express');
const cookieParser = require('cookie-parser');
const routes = require('./routes/index');
const app = express();
var cors = require("cors");

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.options("*", cors());
app.use(cors());
require('./middlewares/handlebars')(app);
require('./middlewares/session')(app);
app.use(routes);
// Public thư mục ra ngoài
app.use(express.static(`${__dirname}/public`));

app.listen(port, () => {
    console.log(`Listen in port ${port}`);
});