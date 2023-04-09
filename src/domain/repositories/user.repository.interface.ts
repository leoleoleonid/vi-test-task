import { User } from '../model/user';

export const USER_REPOSITORY_TOKEN = 'USER_REPOSITORY_TOKEN';

export interface UserRepositoryInterface {
  insert(username: string): Promise<void>;
  findById(id: number): Promise<User>;
  findByName(username: string): Promise<User>;
}
