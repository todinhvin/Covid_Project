const express = require("express");
const cookieParser = require("cookie-parser");
// const {checkExistsUser} = require('./middlewares/checkExistsUser')

const vicimsController = require("./controllers/victims");

const port = 3000;
const app = express();

require("./middlewares/handlebars")(app);
require("./middlewares/session")(app);

app.use("/public", express.static(`${__dirname}/public`));

app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// app.use((req, res, next) => {
//   const user = req.cookies.user ? JSON.parse(req.cookies?.user) : req.user;
//   req.user = user;
//   app.locals.username = user?.f_Username;
//   next();
// });

app.use("/victims", vicimsController);

app.listen(port, () => {
  console.log(`Listen in port ${port}`);
});
