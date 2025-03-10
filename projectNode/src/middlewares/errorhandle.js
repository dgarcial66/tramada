function errorHandler(err, req, res, next) {
  console.error("Error capturado: ", err);
  function statusCode(data) {
    if (process.env.NODE_ENV === "development") {
      return {
        code: err.statusCode || 500,
        ...data,
      };
    }
    return {};
  }

  const response = {
    message: err.message || "Error Interno del servidor",
    ...statusCode({ stack: err.stack }),
  };

  res.status(response.code).json(response);

  next(err);
}

module.exports = { errorHandler };
