import { Socket } from 'socket.io';
import { ServerToClientEvents } from '../events/serverToClientEvents';
import { ClientToServerEvents } from '../events/clientToServerEvents';
import { io } from '..';
import { registerRoomHandlers } from './roomHandler';
import { RoomService } from '../services/RoomService';
import { UserService } from '../services/UserService';

export const onConnection = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
) => {
  // TODO
  socket.emit('ping', 'hello new user');
  io.emit('ping', 'hello all');
  registerRoomHandlers(io, socket, new RoomService(), new UserService());
};
