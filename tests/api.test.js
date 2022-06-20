'use strict';
const request = require('supertest');
let app = null;

describe('API tests', () => {
  before(async () => {
    const allDb = await require('../src/db/index').init();
    const db = allDb.sqlite;
    app = require('../src/app')(db);
  });

  describe('GET /health', () => {
    it('should return health', (done) => {
      request(app)
          .get('/health')
          .expect('Content-Type', /text/)
          .expect(200, done);
    });

    it('POST /rides', (done) => {
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
  });
});
