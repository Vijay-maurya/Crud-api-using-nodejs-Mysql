var express = require("express");
const { response } = require("../app");
var commonJS = require("../_helpers/Common");
var connection = require("../_helpers/dbConfig");
const { param } = require("./customer.controller");

//user authentication
function userAuthentication(sql, args) {
  return new Promise((resolve, reject) => {
    connection.query(sql, args, (err, rows) => {
      console.log(sql, args);
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

function ConnectionQuery(sql, args) {
  return new Promise((resolve, reject) => {
    connection.query(sql, args, function (err, rows) {
      if (err) reject(err);
      resolve(rows);
    });
  });
}

//Get all customer data
function getAllCustomerData(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, function (err, rows) {
      if (err) reject(err);
      resolve(rows);
    });
  });
}

//Get customer details by Id
function getCustomerbyId(sql, args) {
  return ConnectionQuery(sql, args);
}
//Insert customer details
// function InsertCustomer(sql, args) {
//   return new Promise((resolve, reject) => {
//     connection.query(sql, args, function (err, result) {
//       if (err) {
//         reject(err);
//       }
//       resolve(result);
//     });
//   });
// }
function InsertCustomer(sql, args) {
  return ConnectionQuery(sql, args);
}

//Delete customer record
// function DeleteCustomerById(sql, args) {
//   return new Promise((resolve, reject) => {
//     connection.query(sql, args, function (err, result) {
//       if (err) reject(err);
//       resolve(result);
//     });
//   });
// }
function DeleteCustomerById(sql, args) {
  return ConnectionQuery(sql, args);
}

//update customer data
// function updateCustomerData(sql, args) {
//   return new Promise((resolve, reject) => {
//     connection.query(sql, args, function (err, results) {
//       if (err) {
//         reject(err);
//       }
//       resolve(results);
//     });
//   });
// }
function updateCustomerData(sql, args) {
  return ConnectionQuery(sql, args);
}
function close() {
  return new Promise((resolve, reject) => {
    connection.end((err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}
module.exports = {
  userAuthentication,
  getAllCustomerData,
  getCustomerbyId,
  InsertCustomer,
  DeleteCustomerById,
  updateCustomerData,
};
