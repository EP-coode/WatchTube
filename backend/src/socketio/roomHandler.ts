import { Server, Socket } from 'socket.io';
import { randomBytes } from 'crypto';

import { ServerToClientEvents } from '../events/serverToClientEvents';
import { ClientToServerEvents } from '../events/clientToServerEvents';
import { User } from '../domain/User';
import { IRoomService } from '../services/IRoomService';
import { IUserService } from '../services/IUserService';
import { Room } from '../domain/Room';

export const registerRoomHandlers = async (
  io: Server<ClientToServerEvents, ServerToClientEvents>,
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

    socket.emit('onRoomChange', room);
  });

  await socket.on('joinRoom', async ({ userNick, roomId }) => {
    const rooms = roomService.getRooms();
    const room = roomService.getRoomById(roomId);
    if (room == undefined) return Promise.resolve();

    const user = new User(socket.id, userNick);
    room.addParticipant(user);
    await socket.join(roomId);

    io.to(roomId).emit('onRoomChange', room);
  });

  await socket.on('disconnect', async () => {
    const user = userService.getUsersBuId(socket.id);

    if (user == undefined) return Promise.resolve();

    for (const roomId in socket.rooms) {
      const room = roomService.getRoomById(roomId);
      if (room == undefined) continue;

      userService.removeUser(user.userId);

      if (room.isOwner(user)) {
        roomService.removeRoom(room.roomId);
        io.to(roomId).emit('onRoomClose');
      } else {
        io.to(user.userId).emit('onRoomClose');
      }
    }
  });
};
