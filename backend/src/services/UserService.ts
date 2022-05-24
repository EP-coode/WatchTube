import { User } from '../common/User';
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

  removeUser(userId: string) {
    UserService.users = UserService.users.filter((usr) => usr.userId != userId);
  }
}
