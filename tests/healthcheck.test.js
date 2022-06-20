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

  describe('GET /health', () => {
    it('should return health', (done) => {
      request(app)
          .get('/health')
          .expect('Content-Type', /text/)
          .expect(200, done);
    });
  });
});
