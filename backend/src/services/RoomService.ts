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
  getParticipantRoomId(userId: string): string {
    const room = RoomService.rooms.find((r) => {
      if (r.owner.userId === userId) {
        return true;
      }
      const u = r.participants.find((u) => u.userId === userId);
      if (u == undefined) {
        return false;
      } else {
        return true;
      }
    });
    if (room == undefined) {
      return '';
    } else {
      return room.roomId;
    }
  }
}
