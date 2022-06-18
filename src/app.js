'use strict';

const express = require('express');
const app = express();
const router = require('./routes');
module.exports = (db) => {
  app.use(router(db));

  return app;
};
