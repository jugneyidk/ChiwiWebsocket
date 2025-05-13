/*const https = require('https');
const fs = require('fs');
const options = {
  key: fs.readFileSync('//privkey.key'),
  cert: fs.readFileSync('//certificado.crt')
};
const server = https.createServer(options, app);
const io = require('socket.io')(server);
*/

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
});
