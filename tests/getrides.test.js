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

  describe('GET /rides', () => {
    it('should return correct content type', (done) => {
      request(app)
          .get('/rides')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200, done);
    });
  });
});
