const session = require("express-session");

module.exports = (app) => {
  app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: "123456",
      cookie: { maxAge: 60 * 60 * 24 * 1000 },
      
    })
  );
};
