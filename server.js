const express = require('express');
const app = express();
const port = 3000;
const exhbs = require('express-handlebars');
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public thư mục ra ngoài
app.use(express.static(`${__dirname}/public`));



var hbs = exhbs.create({
    defaultLayout: 'main',
    extname: "hbs",
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');



app.get('/', (req, res) => {
    res.render('home');
});
app.get('/home', (req, res) => {
    res.render('home');
});

// route cho nguoi benh
app.use('/patient', require('./controllers/patient.C'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})