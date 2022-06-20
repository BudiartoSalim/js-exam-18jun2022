/* eslint-disable max-len */
'use strict';
const request = require('supertest');
let app = null;

describe('API tests', () => {
  before(async () => {
    const allDb = await require('../src/db/index').init();
    const db = allDb.sqlite;
    app = require('../src/app')(db);
  });

  describe('POST /rides', () => {
    it('Should add new ride successfully', (done) => {
      request(app)
          .post('/rides')
          .send({
            'start_lat': 10,
            'start_long': 20,
            'end_lat': 30,
            'end_long': 40,
            'rider_name': 'budi',
            'driver_name': 'ipul',
            'driver_vehicle': 'ferrari',
          })
          .expect(200, done);
    });

    it('Should throw error if start lat/long is invalid', (done) => {
      request(app)
          .post('/rides')
          .send({
            'start_lat': 1000,
            'start_long': 20,
            'end_lat': 30,
            'end_long': 40,
            'rider_name': 'budi',
            'driver_name': 'ipul',
            'driver_vehicle': 'ferrari',
          })
          .expect({
            error_code: 'VALIDATION_ERROR',
            message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
          }, done);
    });

    it('Should throw error if end lat/long is invalid', (done) => {
      request(app)
          .post('/rides')
          .send({
            'start_lat': 10,
            'start_long': 20,
            'end_lat': 30,
            'end_long': -42230,
            'rider_name': 'budi',
            'driver_name': 'ipul',
            'driver_vehicle': 'ferrari',
          })
          .expect({
            error_code: 'VALIDATION_ERROR',
            message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
          }, done);
    });
  });

  it('Should throw error if rider name is invalid', (done) => {
    request(app)
        .post('/rides')
        .send({
          'start_lat': 10,
          'start_long': 20,
          'end_lat': 30,
          'end_long': 20,
          'rider_name': '',
          'driver_name': 'ipul',
          'driver_vehicle': 'ferrari',
        })
        .expect({
          error_code: 'VALIDATION_ERROR',
          message: 'Rider name must be a non empty string',
        }, done);
  });

  it('Should throw error if driver is invalid', (done) => {
    request(app)
        .post('/rides')
        .send({
          'start_lat': 10,
          'start_long': 20,
          'end_lat': 30,
          'end_long': 20,
          'rider_name': 'budi',
          'driver_name': '',
          'driver_vehicle': 'ferrari',
        })
        .expect({
          error_code: 'VALIDATION_ERROR',
          message: 'Rider name must be a non empty string',
        }, done);
  });

  it('Should throw error if vehicle name is invalid', (done) => {
    request(app)
        .post('/rides')
        .send({
          'start_lat': 10,
          'start_long': 20,
          'end_lat': 30,
          'end_long': 20,
          'rider_name': 'budi',
          'driver_name': 'sds',
          'driver_vehicle': '',
        })
        .expect({
          error_code: 'VALIDATION_ERROR',
          message: 'Rider name must be a non empty string',
        }, done);
  });
});
