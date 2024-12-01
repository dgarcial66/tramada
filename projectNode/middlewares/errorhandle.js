function errorHandler(err, req, res, next) {
  console.error("Error capturado: ", err);
  console.log(err.code, err.status);
  const statusCode = err.statusCode || 500;
  const response = {
    message: err.message || "Error Interno del servidor",
    ...statusCode(
      process.env.NODE_ENV === "development" && { stack: err.stack }
    ),
  };

  console.error("SOY ERRORHANDLER", response);
  res.status(statusCode).json(response);

  next(err);
}

module.exports = { errorHandler };
