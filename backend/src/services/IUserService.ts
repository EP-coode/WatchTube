import { User } from '../domain/User';

export interface IUserService {
  getUsers: () => User[];
  getUsersBuId: (userId: string) => User | undefined;
  addUser: (user: User) => void;
  removeUser: (userId: string) => void;
}
