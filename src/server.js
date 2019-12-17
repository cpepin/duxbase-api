const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const socketIo = require("socket.io");
require("dotenv").config();

const apiRoutes = require("./api/routes");

const errorHandler = require("./api/middleware/errorHandler");
const forceSSL = require("./api/middleware/forceSSL");

const { initialize } = require("./api/services/notificationBroker");

const port = parseInt(process.env.PORT, 10) || 3000;

const app = express();

app.use(cors());
app.use(forceSSL);
app.use(cookieParser());
app.use(express.json());

app.use("/", apiRoutes);

app.use(errorHandler);

const server = app.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});

const io = socketIo(server);
initialize(io);
