import { Room } from '../common/Room';

export interface IRoomService {
  getRooms: () => Room[];
  getRoomById: (roomId: string) => Room | undefined;
  addRoom: (room: Room) => void;
  removeRoom: (roomId: string) => void;
  getParticipantRoomId: (userId: string) => string;
}
