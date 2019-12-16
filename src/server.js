const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const apiRoutes = require("./api/routes");

const errorHandler = require("./api/middleware/errorHandler");
const forceSSL = require("./api/middleware/forceSSL");

const port = parseInt(process.env.PORT, 10) || 3000;

app.use(cors());
app.use(forceSSL);
app.use(cookieParser());
app.use(express.json());

app.use("/", apiRoutes);

app.use(errorHandler);

server.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
