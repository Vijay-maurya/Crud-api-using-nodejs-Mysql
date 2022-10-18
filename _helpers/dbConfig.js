var myql = require("mysql");
var config = require("../config.json");

const { host, user, password, database } = config.Database;
var connection = myql.createConnection({ host, user, password, database });
connection.connect(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log("Database connected..");
  }
});
module.exports = connection;
