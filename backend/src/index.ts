import { createExpressApp } from './server.config';
import http from 'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';

import { ServerToClientEvents } from './events/serverToClientEvents';
import { ClientToServerEvents } from './events/clientToServerEvents';
import { onConnection } from './socketio/connectionHandler';

dotenv.config();
const PORT = parseInt(process.env.PORT ?? '8000');
const HOST = process.env.HOST ?? '127.0.0.1';

const app = createExpressApp();
const server = http.createServer(app);
export const io = new Server<ServerToClientEvents, ClientToServerEvents>(
  server,
);
io.on('connection', onConnection);

server.listen(PORT, HOST, () => {
  console.log(`App runing at http://${HOST}:${PORT}`);
});
