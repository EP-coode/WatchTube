import { User } from '../domain/User';
import { IUserService } from './IUserService';

export class UserService implements IUserService {
  static users: User[] = [];

  getUsers() {
    return UserService.users;
  }

  getUsersBuId(userId: string) {
    return UserService.users.find((user) => user.userId == userId);
  }

  addUser(user: User) {
    UserService.users.push(user);
  }
}
