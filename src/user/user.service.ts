import { Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from './user.logger';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  constructor(private readonly logger: LoggerService) {}

  private users: User[] = [
    { id: 1, name: 'jay', email: 'jay@dev.com' },
    { id: 2, name: 'sadam', email: 'sadam@dev.com' },
  ];

  findAllUsers(name: string = ''): User[] {
    this.logger.log('Finding all users');
    return this.users
      .filter((user) =>
        user.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()),
      )
      .map(({ id, name, email }) => ({ id, name, email }));
  }

  findOneUser(id: number): User {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return user;
  }
}
