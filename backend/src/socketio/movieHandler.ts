import { Server, Socket } from 'socket.io';

import { ServerToClientEvents } from '../events/serverToClientEvents';
import { ClientToServerEvents } from '../events/clientToServerEvents';
import { IRoomService } from '../services/IRoomService';
import { IUserService } from '../services/IUserService';
import { Movie } from '../common/Movie';

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
        io.to(roomId).emit('onMovieChange', room.movie);
      }
    }
  });
  await socket.on('setMovie', async (ytMovieId) => {
    const roomId = roomService.getParticipantRoomId(socket.id);
    const room = roomService.getRoomById(roomId);
    const movie = new Movie(ytMovieId, false, 0);
    if (room == undefined) {
      return Promise.resolve();
    } else {
      room.movie = movie;
      io.to(roomId).emit('onMovieChange', movie);
    }
  });
  await socket.on('playMovie', async () => {
    const roomId = roomService.getParticipantRoomId(socket.id);
    const room = roomService.getRoomById(roomId);
    if (room != undefined) {
      if (room.movie == undefined) {
        return Promise.resolve();
      } else {
        room.movie.isPlaying = true;
        io.to(roomId).emit('onMovieChange', room.movie);
      }
    }
  });
  await socket.on('pouseMovie', async () => {
    const roomId = roomService.getParticipantRoomId(socket.id);
    const room = roomService.getRoomById(roomId);
    if (room != undefined) {
      if (room.movie == undefined) {
        return Promise.resolve();
      } else {
        console.log(room.movie);
        io.to(roomId).emit('onMovieChange', room.movie);
      }
    }
  });
};
