import { User } from './User';

export class Room {
  constructor(public roomId: string, public owner: User) {}
}
