const routerConstructor = require('express').Router;
const router = routerConstructor();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

module.exports = (db) => {
  router.post('/', jsonParser, async (req, res) => {
    const startLatitude = Number(req.body.start_lat);
    const startLongitude = Number(req.body.start_long);
    const endLatitude = Number(req.body.end_lat);
    const endLongitude = Number(req.body.end_long);
    const riderName = req.body.rider_name;
    const driverName = req.body.driver_name;
    const driverVehicle = req.body.driver_vehicle;

    if (startLatitude < -90 ||
    startLatitude > 90 ||
    startLongitude < -180 ||
    startLongitude > 180) {
      return res.send({
        error_code: 'VALIDATION_ERROR',
        // eslint-disable-next-line max-len
        message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
      });
    }

    if (endLatitude < -90 ||
      endLatitude > 90 ||
      endLongitude < -180 ||
      endLongitude > 180) {
      return res.send({
        error_code: 'VALIDATION_ERROR',
        // eslint-disable-next-line max-len
        message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
      });
    }

    if (typeof riderName !== 'string' || riderName.length < 1) {
      return res.send({
        error_code: 'VALIDATION_ERROR',
        message: 'Rider name must be a non empty string',
      });
    }

    if (typeof driverName !== 'string' || driverName.length < 1) {
      return res.send({
        error_code: 'VALIDATION_ERROR',
        message: 'Rider name must be a non empty string',
      });
    }

    if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
      return res.send({
        error_code: 'VALIDATION_ERROR',
        message: 'Rider name must be a non empty string',
      });
    }

    const values = [
      req.body.start_lat,
      req.body.start_long,
      req.body.end_lat,
      req.body.end_long,
      req.body.rider_name,
      req.body.driver_name,
      req.body.driver_vehicle,
    ];

    const {lastID} = await db.run(
        `INSERT INTO Rides
        (
          startLat, 
          startLong, 
          endLat, 
          endLong, 
          riderName, 
          driverName, 
          driverVehicle
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        values,
    );

    const result = await db.all('SELECT * FROM Rides WHERE rideID = ?', lastID);
    res.send(result);
  });

  router.get('/', async (req, res) => {
    try {
      const rows = await db.all('SELECT * FROM Rides');

      if (rows.length === 0) {
        return res.send({
          error_code: 'RIDES_NOT_FOUND_ERROR',
          message: 'Could not find any rides',
        });
      }

      res.send(rows);
    } catch (err) {
      return res.send({
        error_code: 'SERVER_ERROR',
        message: 'Unknown error',
      });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const rows = await db.all(`SELECT * FROM Rides WHERE rideID=?`, id);
      if (rows.length === 0) {
        return res.send({
          error_code: 'RIDES_NOT_FOUND_ERROR',
          message: 'Could not find any rides',
        });
      }
      res.send(rows);
    } catch (err) {
      return res.send({
        error_code: 'SERVER_ERROR',
        message: 'Unknown error',
      });
    }
  });

  return router;
};