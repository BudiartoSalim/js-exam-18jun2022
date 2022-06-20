module.exports = (req, res, next) => {
  try {
    const startLatitude = Number(req.body.start_lat);
    const startLongitude = Number(req.body.start_long);

    if (startLatitude < -90 ||
      startLatitude > 90 ||
      startLongitude < -180 ||
      startLongitude > 180) {
      // eslint-disable-next-line max-len
      throw new Error('Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively');
    }
    next();
  } catch (err) {
    return res.send({
      error_code: 'VALIDATION_ERROR',
      message: err.message,
    });
  }
};
