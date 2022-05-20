import { Socket } from 'socket.io';
import { ServerToClientEvents } from '../interfaces/serverToClientEvents';
import { ClientToServerEvents } from '../interfaces/clientToServerEvents';
import { io } from '..';

export const onConnection = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
) => {
  // TODO
  socket.emit('ping', 'hello new user');
  io.emit('ping', 'hello all');
};
