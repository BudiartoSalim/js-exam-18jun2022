const routerConstructor = require('express').Router;
const router = routerConstructor();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const Validator = require('../../middlewares/validators');
const rideController = require('../../controllers/ride_controller');

module.exports = (db) => {
  router.post('/',
      jsonParser,
      Validator.startLatLong,
      Validator.endLatLong,
      Validator.riderName,
      Validator.driverName,
      Validator.driverVehicle,
      rideController(db).addNewRider,
  );

  router.get('/',
      rideController(db).getRider,
  );

  router.get('/:id',
      rideController(db).getRiderById,
  );

  return router;
};
