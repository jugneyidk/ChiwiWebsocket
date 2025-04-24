const messageHandler = require('./handlers/message');
const userHandler = require('./handlers/user');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`ChiwiAmigo conectado: ${socket.id}`);

    messageHandler(io, socket);
    userHandler(io, socket);

    socket.on('disconnect', () => {
      console.log(`ChiwiAmigo desconectado: ${socket.id}`);
    });
  });
};
