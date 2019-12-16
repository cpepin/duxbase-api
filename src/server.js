const express = require("express");
const app = express();
const httpServer = require("http").Server(app);
const httpsServer = require("https").Server(app);
const httpIo = require("socket.io")(httpServer);
const httpsIo = require("socket.io")(httpsServer);

const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const apiRoutes = require("./api/routes");

const errorHandler = require("./api/middleware/errorHandler");
const forceSSL = require("./api/middleware/forceSSL");

const httpPort = parseInt(process.env.PORT, 10) || 3000;
const httpsPort = 443;

app.use(cors());
app.use(forceSSL);
app.use(cookieParser());
app.use(express.json());

app.use("/", apiRoutes);

app.use(errorHandler);

httpServer.listen(httpPort, err => {
  if (err) throw err;
  console.log(`> HTTP Ready on port ${httpPort}`);
});

httpsServer.listen(httpsPort, err => {
  if (err) throw err;
  console.log(`> HTTPS Ready on port ${httpsPort}`);
});
