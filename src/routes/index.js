const routerConstructor = require('express').Router;
const router = routerConstructor();
const ridesRouter = require('./rides');

module.exports = (db) => {
  router.get('/health', (req, res) => res.send('Healthy'));
  router.use('/rides', ridesRouter(db));

  return router;
};
