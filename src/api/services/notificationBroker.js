let websocket;

function initialize(socketIo) {
  websocket = socketIo;

  websocket.on("connection", function(socket) {
    socket.emit("news", { hello: "world" });
  });
}

module.exports = {
  initialize
};
