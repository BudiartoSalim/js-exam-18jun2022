module.exports = (req, res, next) => {
  try {
    const endLatitude = Number(req.body.end_lat);
    const endLongitude = Number(req.body.end_long);

    if (endLatitude < -90 ||
      endLatitude > 90 ||
      endLongitude < -180 ||
      endLongitude > 180) {
      // eslint-disable-next-line max-len
      throw new Error('End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively');
    }
    next();
  } catch (err) {
    return res.send({
      error_code: 'VALIDATION_ERROR',
      message: err.message,
    });
  }
};
