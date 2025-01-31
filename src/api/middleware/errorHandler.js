const errorHandler = (err, req, res, next) => {
  if (err.isServer) {
    console.error(err);
  }
  return res.status(err.output.statusCode).json(err);
};

module.exports = errorHandler;
