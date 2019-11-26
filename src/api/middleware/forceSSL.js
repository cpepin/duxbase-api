/**
 * Force load with https on production environment
 * https://devcenter.heroku.com/articles/http-routing#heroku-headers
 */
module.exports = (req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    if (req.headers["x-forwarded-proto"] != "https") {
      res.redirect(302, `https://${req.hostname}${req.originalUrl}`);
    } else {
      next();
    }
  } else {
    next();
  }
};
