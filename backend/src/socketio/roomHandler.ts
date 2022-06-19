import { Server, Socket } from 'socket.io';
import { randomBytes } from 'crypto';

import { ServerToClientEvents } from '../events/serverToClientEvents';
import { ClientToServerEvents } from '../events/clientToServerEvents';
import { User } from '../common/User';
import { IRoomService } from '../services/IRoomService';
import { IUserService } from '../services/IUserService';
import { Room } from '../common/Room';
import { Movie } from '../common/Movie';

const DEFAULT_MOVIE = 'rvrZJ5C_Nwg';

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
    room.movie = new Movie(DEFAULT_MOVIE, true, 0);
    roomService.addRoom(room);

    await socket.join(roomId);

    socket.emit('onRoomChange', room);
  });

  await socket.on('joinRoom', async ({ userNick, roomId }) => {
    const rooms = roomService.getRooms();
    const room = roomService.getRoomById(roomId);
    if (room == undefined) return Promise.resolve();

    const user = new User(socket.id, userNick);

    const alreadyInRoom =
      room.isOwner(user) ||
      room.participants.findIndex((u) => u.userId != socket.id);

    if (alreadyInRoom != -1) return Promise.resolve();

    userService.addUser(user);
    room.addParticipant(user);
    await socket.join(roomId);

    io.to(roomId).emit('onRoomChange', room);
  });

  await socket.on('getRoomInfo', async (roomId) => {
    const room = roomService.getRoomById(roomId);
    if (room == undefined) return Promise.resolve();
    socket.emit('onRoomChange', room);
  });

  await socket.on('disconnecting', async () => {
    const user = userService.getUsersBuId(socket.id);
    const users = userService.getUsers();

    if (user == undefined) return Promise.resolve();

    socket.rooms.forEach((roomId) => {
      const room = roomService.getRoomById(roomId);
      if (room == undefined) return;

      userService.removeUser(user.userId);
      room.participants = room.participants.filter(
        (u) => u.userId != user.userId,
      );
      io.to(room.roomId).emit('onRoomChange', room);

      if (room.isOwner(user)) {
        roomService.removeRoom(room.roomId);
        io.to(roomId).emit('onRoomClose');
      } else {
        io.to(user.userId).emit('onRoomClose');
      }
    });
  });
};
