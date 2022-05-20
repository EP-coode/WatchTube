import { Room } from '../domain/Room';
import { User } from '../domain/User';

export interface ServerToClientEvents {
  ping: (response: string) => void;
  onRoomChange: (room: Room) => void;
  onUserChange: (user: User) => void;
  onRoomClose: () => void;
}
