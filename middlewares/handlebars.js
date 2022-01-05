const exphbs = require("express-handlebars");
module.exports = (app) => {
  const hbs = exphbs.create({
    defaultLayout: "manager",
    extname: "hbs",
    helpers: {
      compareString(s1, s2, options) {
        return s1 === s2 ? options.fn(this) : options.inverse(this);
      },

      compareInt(int1, int2, options) {
        return +int1 === +int2 ? options.fn(this) : options.inverse(this);
      },
      checkExists(obj1, options) {
        return obj1 ? options.fn(this) : options.inverse(this);
      },
      forN(n, block) {
        let acum = "";
        for (let i = 1; i <= n; i++) {
          acum += block.fn(i);
        }
        return acum;
      },
      formatTime(time) {
        return time.toLocaleString();
      },
      formatBirthday(time) {
        return time.toLocaleDateString();
      },
    },
  });

  app.engine("hbs", hbs.engine);
  app.set("view engine", ".hbs");
  app.set("views", "./views");
};
