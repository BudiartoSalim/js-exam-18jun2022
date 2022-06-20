const RideServices = require('../services/ride_services');

module.exports = (db) => {
  return {
    getRider: async (req, res) => {
      try {
        const limit = req.query.limit;
        const page = req.query.page;

        const data = await RideServices.getRider(db, limit, page);

        if (data.length === 0) {
          return res.send({
            error_code: 'RIDES_NOT_FOUND_ERROR',
            message: 'Could not find any rides',
          });
        }
        res.send(data);
      } catch (err) {
        console.log(err);
        return res.send({
          error_code: 'SERVER_ERROR',
          message: 'Unknown error',
        });
      }
    },
    getRiderById: async (req, res) => {
      try {
        const data = await RideServices.getRiderById(db, req.params.id);

        if (data.length === 0) {
          return res.send({
            error_code: 'RIDES_NOT_FOUND_ERROR',
            message: 'Could not find any rides',
          });
        }
        res.send(data);
      } catch (err) {
        console.log(err);
        return res.send({
          error_code: 'SERVER_ERROR',
          message: 'Unknown error',
        });
      }
    },
    addNewRider: async (req, res) => {
      try {
        const input = {
          startLat: req.body.start_lat,
          startLong: req.body.start_long,
          endLat: req.body.end_lat,
          endLong: req.body.end_long,
          riderName: req.body.rider_name,
          driverName: req.body.driver_name,
          driverVehicle: req.body.driver_vehicle,
        };
        const data = await RideServices.addNewRider(db, input);
        res.send(data);
      } catch (err) {
        return res.send({
          error_code: 'SERVER_ERROR',
          message: 'Unknown error',
        });
      }
    },
  };
};
