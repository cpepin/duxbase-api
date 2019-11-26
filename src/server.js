const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const apiRoutes = require("./api/routes");

const errorHandler = require("./api/middleware/errorHandler");
const forceSSL = require("./api/middleware/forceSSL");

const port = parseInt(process.env.PORT, 10) || 3000;

const server = express();

server.use(cors());
server.use(forceSSL);
server.use(cookieParser());
server.use(express.json());

server.use("/", apiRoutes);

server.use(errorHandler);

server.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
