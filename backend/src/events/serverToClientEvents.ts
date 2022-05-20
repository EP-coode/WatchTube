import { Room } from '../domain/Room';

export interface ServerToClientEvents {
  ping: (response: string) => void;
  joinedRoom: (room: Room) => void;
}
