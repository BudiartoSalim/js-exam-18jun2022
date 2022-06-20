
module.exports = (req, res, next) => {
  try {
    const riderName = req.body.rider_name;
    if (typeof riderName !== 'string' || riderName.length < 1) {
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


