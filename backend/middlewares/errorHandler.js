const { error } = require("console");

module.exports = (err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  const stack = err.stack;

  res.status(statusCode);
  res.json({
    code: statusCode,
    stack,
    message: err.message,
  });
};
