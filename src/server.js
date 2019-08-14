const express = require('express');
const next = require('next');

const apiRoutes = require('./api/routes');

const errorHandler = require('./api/middleware/errorHandler');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: 'src/ui' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.json());

  server.use('/api', apiRoutes);
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.use(errorHandler);

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});