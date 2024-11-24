function errorHandler(err, req, res, next) {
  console.error("Error capturado: ", err.message);
  console.log(err.statusCode, err.status);
  const statusCode = err.statusCode || 500;
  const response = {
    message: err.message || "Error Interno del servidor",
    ...statusCode(
      process.env.NODE_ENV === "development" && { stack: err.stack }
    ),
  };

  console.log("SOY ERRORHANDLER", response);
  res.status(statusCode).json(response);
}

module.exports = { errorHandler };
