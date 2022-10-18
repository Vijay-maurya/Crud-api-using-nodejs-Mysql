module.exports = {
  SQL_LOGIN: "SELECT * FROM CUSTOMER WHERE FirstName = ?",
  SQL_GETAllCUSTOMER: "SELECT * FROM CUSTOMER",
  SQL_GETCUSTOMERBYID: "SELECT * FROM CUSTOMER WHERE CustomerId =?",
  SQL_InsertCustomerDetails: "INSERT INTO CUSTOMER SET ?",
  SQL_DeleteCustomer: "DELETE FROM CUSTOMER WHERE CustomerId =?",
  SQL_UpdateCustomer:
    "UPDATE CUSTOMER SET FirstName=?,LastName=?,Email=?,Address=?,PhoneNo=? WHERE CustomerId=?",
  OK: 200,
  POST_SATUSCODE: 201,
  DELETE_STATUSCODE: 204,
  UPDATE_STATUSCODE: 204,
};
