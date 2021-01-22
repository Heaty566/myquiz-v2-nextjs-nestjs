import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { CusService } from '../../common/interfaces/CusService';

//* Internal import
import { UserRepository } from './entities/user.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UserService extends CusService<User> {
        constructor(@InjectRepository(User) private readonly userRepository: UserRepository) {
                super(userRepository);
        }
}
