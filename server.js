const express = require('express');
const routes = require('./routes/index');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
require('./middlewares/handlebars')(app);
require('./middlewares/session')(app);
// Public thư mục ra ngoài
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.render('home');
});
app.get('/home', (req, res) => {
  res.render('home');
});

app.listen(port, () => {
  console.log(`Listen in port ${port}`);
});
