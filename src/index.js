const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const socketHandler = require('./socket');
const socketConfig = require('./config/socketConfig');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, socketConfig);

socketHandler(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`ChiwiSocket corriendo en puerto ${PORT}`);
});
