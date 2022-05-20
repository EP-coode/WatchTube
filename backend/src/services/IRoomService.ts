import { Room } from '../domain/Room';

export interface IRoomService {
  getRooms: () => Room[];
  getRoomById: (roomId: string) => Room | undefined;
  addRoom: (room: Room) => void;
}
