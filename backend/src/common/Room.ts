import { User } from './User';
import { Movie } from './Movie';

export class Room {
  participants: User[];
  public movie: Movie | null;

  constructor(public roomId: string, public owner: User) {
    this.participants = [];
    this.movie = null;
  }

  addParticipant(user: User) {
    this.participants.push(user);
  }

  removeParticipant(userId: string) {
    this.participants = this.participants.filter((usr) => usr.userId != userId);
  }

  isOwner(user: User): boolean {
    return this.owner.userId == user.userId;
  }
}
