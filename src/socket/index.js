const messageHandler = require('./handlers/message');
const userHandler = require('./handlers/user');

module.exports = (io) => {
  io.on('connection', (socket) => {
    messageHandler(io, socket);
    userHandler(io, socket);

    socket.on('disconnect', () => {
    });
  });
};
