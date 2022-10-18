var express = require("express");
var CustomerRoute = require("./Users/customer.controller");
var connection = require("./_helpers/dbConfig");
var bodyParser = require("body-parser");
var ExpressSession = require("express-session");
const logger = require("./_middleware/Logging");
var mySQLStore = require("express-mysql-session")(ExpressSession);
var { engine } = require("express-handlebars");
var path = require("path");

var app = express();
var PublicFolder = path.join(__dirname, "./views");

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

var path = app.use(express.static(PublicFolder));

// Required to Parse JSON coming from request body
app.use(bodyParser.json());
//Express session settings
//var cookie = require("cookie-parser"); obsolete : No longer need to be used.
var sessionStore = new mySQLStore({}, connection);
app.use(
  ExpressSession({
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    secret: "Its my secret",
    cookie: { maxAge: 6000000 },
  })
);

// Application route
app.get("/", function (req, res) {
  res.send("Server is available and running to serve request !!");
});
app.use("/Customer", CustomerRoute);

//Launch Node server
app.listen(3000, function () {
  var port = 3000;
  console.log(`Server is running at port ${port}`);
  logger.info(`Server is running at port ${port}`);
});
module.exports = app;
