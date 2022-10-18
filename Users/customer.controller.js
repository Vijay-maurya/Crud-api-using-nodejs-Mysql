const express = require("express");
const { response } = require("../app");
const commonJS = require("../_helpers/Common");
const connection = require("../_helpers/dbConfig");
const userService = require("./customer.service");
const constants = require("../_helpers/constants");
const logger = require("../_middleware/Logging");
const router = express.Router();

//Routes

router.get("/home", renderHtml);
router.post("/login", authenticate);
router.get("/GetAll", GetAllCustomer);
router.get("/:id", GetCustomerById);
router.post("/Add", PostCustomerData);
router.delete("/Delete", DeleteCustomerData);
router.put("/update", PutCustomerData);
router.get("*", (req, res) => {
  res.send({ message: "Page not found" });
});

function authenticate(req, res) {
  var sql = constants.SQL_LOGIN;
  var params = req.body.FirstName;
  userService
    .userAuthentication(sql, params)
    .then((rows) => {
      console.log(process.env);
      if (rows.length > 0) {
        req.session.isAuth = true;
        req.session.CustomerId = rows[0].CustomerId;
        console.log(req.session.CustomerId);
        res.sendStatus(constants.OK);
      }
    })
    .catch((error) => {
      res.send(
        commonJS.SendErrorMessage(
          error.code,
          error.errno,
          error.sql,
          error.sqlMessage
        )
      );
    });
}

//Get All customer
function GetAllCustomer(req, res) {
  var sql = constants.SQL_GETAllCUSTOMER;
  logger.info("Get all customer called");
  userService
    .getAllCustomerData(sql)
    .then((rows) => res.send(rows))
    .catch((error) => {
      res.send(
        commonJS.SendErrorMessage(
          error.code,
          error.errno,
          error.sql,
          error.sqlMessage
        )
      );
    });
}

//GetCustomer by Id
function GetCustomerById(req, res) {
  var sql = constants.SQL_GETCUSTOMERBYID;
  if (!req.params.id) {
    return res.send({ error: "You must provid customer id" });
  }
  var params = parseInt(req.params.id);

  if (isNaN(params)) {
    return res.send({ error: "You must provide customer id in Number" });
  }
  console.log(params);
  userService
    .getCustomerbyId(sql, params)
    .then((rows) => res.send(rows))
    .catch((error) => {
      res.send(
        commonJS.SendErrorMessage(
          error.code,
          error.errno,
          error.sql,
          error.sqlMessage
        )
      );
    });
}

//Insert customer details
function PostCustomerData(req, res) {
  var sql = constants.SQL_InsertCustomerDetails;
  var params = req.body;
  userService
    .InsertCustomer(sql, params)
    .then((rows) => {
      res.sendStatus(constants.POST_SATUSCODE);
    })
    .catch((error) => {
      console.log("error---" + error);
      res.send(
        commonJS.SendErrorMessage(
          error.code,
          error.errno,
          error.sql,
          error.sqlMessage
        )
      );
    });
}

//Delete customer record
function DeleteCustomerData(req, res) {
  var sql = constants.SQL_DeleteCustomer;
  var params = req.body.CustomerId;
  userService
    .DeleteCustomerById(sql, params)
    .then((rows) => {
      res.sendStatus(constants.DELETE_STATUSCODE);
    })
    .catch((error) => {
      res.send(
        commonJS.SendErrorMessage(
          error.code,
          error.errno,
          error.sql,
          error.sqlMessage
        )
      );
    });
}

//update customer data
function PutCustomerData(req, res) {
  var sql = constants.SQL_UpdateCustomer;
  var CustomerId = req.query.id;
  var jsonval = req.body;
  var arr = [];
  for (var i in jsonval) arr.push(jsonval[i]);
  arr.push(CustomerId);
  userService
    .updateCustomerData(sql, arr)
    .then((rows) => {
      res.sendStatus(constants.UPDATE_STATUSCODE);
    })
    .catch((error) => {
      res.send(
        commonJS.SendErrorMessage(
          error.code,
          error.errno,
          error.sql,
          error.sqlMessage
        )
      );
    });
}

function Authorize(req, res, next) {
  if (typeof req.session.isAuth != "undefined") {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
  next();
}
function renderHtml(req, res) {
  res.render("home", { title: "this is home page" });
}
module.exports = router;
