function errorAuthHandler(err, req, res, next) {
  if (err) {
    console.log("ENTREEE", err);
    return res.status(401).json({ message: err });
  }

  next();
}

module.exports = { errorAuthHandler };
