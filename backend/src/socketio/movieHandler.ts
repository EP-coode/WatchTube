import { Server, Socket } from 'socket.io';

import { ServerToClientEvents } from '../events/serverToClientEvents';
import { ClientToServerEvents } from '../events/clientToServerEvents';
import { IRoomService } from '../services/IRoomService';
import { IUserService } from '../services/IUserService';

export const registerMovieHandlers = async (
  io: Server<ClientToServerEvents, ServerToClientEvents>,
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
  roomService: IRoomService,
  userService: IUserService,
) => {
  await socket.on('seekTo', async (progress) => {
    const roomId = roomService.getParticipantRoomId(socket.id);
    const room = roomService.getRoomById(roomId);
    if (room != undefined) {
      if (room.movie == undefined) {
        return Promise.resolve();
      } else {
        room.movie.currentProggres = progress;
        console.log('Progess ' + progress);
        console.log(room.movie);
        io.to(roomId).emit('onMovieChange', room.movie);
      }
    }
  });
};
