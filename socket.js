export const handleSocket = io => {
  io.on('connection', socket => {
    socket.on('chat message', message => {
        console.log(`${socket.id}: ${message}`)
        io.emit('chat message', message) 
    });
    console.log('a user connected: ', socket.id);
    socket.on('disconnect', () => {
      console.log('user disconnected: ', socket.id);
    });
  });
}