import { User } from '../common/User';

export interface IUserService {
  getUsers: () => User[];
  getUsersBuId: (userId: string) => User | undefined;
  addUser: (user: User) => void;
  removeUser: (userId: string) => void;
}
