
module.exports = (req, res, next) => {
  try {
    const driverName = req.body.driver_name;
    if (typeof driverName !== 'string' || driverName.length < 1) {
      throw new Error( 'Rider name must be a non empty string');
    }
    next();
  } catch (err) {
    res.send({
      error_code: 'VALIDATION_ERROR',
      message: err.message,
    });
  }
};


