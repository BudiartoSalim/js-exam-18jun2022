
module.exports = (req, res, next) => {
  try {
    const driverVehicle = req.body.driver_vehicle;
    if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
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


