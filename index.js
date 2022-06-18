'use strict';
const port = 8010;

require('./src/db').init().then((db) => {
  const app = require('./src/app')(db.sqlite);

  app.listen(port, () => {
    console.log(`App started and listening on port ${port}`);
  });
});
