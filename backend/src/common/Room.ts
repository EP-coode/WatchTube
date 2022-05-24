import { User } from './User';

export class Room {
  participants: User[];

  constructor(public roomId: string, public owner: User) {
    this.participants = [];
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