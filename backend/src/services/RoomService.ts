import { Room } from '../common/Room';
import { IRoomService } from './IRoomService';

export class RoomService implements IRoomService {
  static rooms: Room[] = [];

  getRooms() {
    return RoomService.rooms;
  }

  getRoomById(roomId: string) {
    return RoomService.rooms.find((room) => room.roomId == roomId);
  }

  addRoom(room: Room) {
    RoomService.rooms.push(room);
  }

  removeRoom(roomId: string) {
    RoomService.rooms = RoomService.rooms.filter((r) => r.roomId != roomId);
  }
}
