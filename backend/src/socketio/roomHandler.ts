import { Server, Socket } from 'socket.io';
import { randomBytes } from 'crypto';

import { ServerToClientEvents } from '../events/serverToClientEvents';
import { ClientToServerEvents } from '../events/clientToServerEvents';
import { User } from '../domain/User';
import { IRoomService } from '../services/IRoomService';
import { IUserService } from '../services/IUserService';
import { Room } from '../domain/Room';

export const registerRoomHandlers = async (
  io: Server<ServerToClientEvents, ClientToServerEvents>,
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
  roomService: IRoomService,
  userService: IUserService,
) => {
  await socket.on('createRoom', async (userNick) => {
    const user = new User(socket.id, userNick);
    userService.addUser(user);

    const roomId = randomBytes(16).toString('hex');
    const room = new Room(roomId, user);
    roomService.addRoom(room);

    await socket.join(roomId);

    socket.emit('joinedRoom', room);
  });
};
