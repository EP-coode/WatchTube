import { Movie } from '../common/Movie';
import { Room } from '../common/Room';
import { User } from '../common/User';

export interface ServerToClientEvents {
  ping: (response: string) => void;
  onRoomChange: (room: Room) => void;
  onUserChange: (user: User) => void;
  onRoomClose: () => void;
  onMovieChange: (movie: Movie) => void;
}
