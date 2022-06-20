const RideRepository = require('../repositories/rides');

module.exports = {
  getRider: (db, limit = 100, pageOffset = 0) => {
    const offset = pageOffset * limit;
    return RideRepository.getRiders(db, limit, offset);
  },
  getRiderById: (db, id) => {
    return RideRepository.getRiderById(db, id);
  },
  addNewRider: (db, input) => {
    return RideRepository.addRiders(db, input);
  },
};
