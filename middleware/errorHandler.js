module.exports = (err, req, res, next) => {
  console.error(err.stack); // Konsolga xatoni chiqarish
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
