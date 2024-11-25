function errorAuthHandler(err, req, res, next) {
  if (err.statusCode === 401) {
    console.log("ENTREEE", err);
    return res.status(401).json({ message: err });
  }

  next(err);
}

module.exports = { errorAuthHandler };
