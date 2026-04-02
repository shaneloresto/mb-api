import app from './express.js';
import {Server} from 'socket.io';
import { handleSocket } from './socket.js';
const port = process.env.PORT || 3004;
const httpServer = app.listen(port, (err) => {
    if (err) console.log(err);
    console.info(`Server started on port ${port}.`);
});
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
});
handleSocket(io);