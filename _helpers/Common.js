function SendErrorMessage(code, errno, sqlmessage, sql) {
  errorMessage = {
    error_code: code,
    error_number: errno,
    sql_query: sql,
    Message: sqlmessage,
  };
  return errorMessage;
}
module.exports = { SendErrorMessage };
