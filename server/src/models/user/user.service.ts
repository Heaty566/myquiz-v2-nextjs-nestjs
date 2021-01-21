import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';

//* Internal import
import { UserRepository } from './entities/user.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
        constructor(@InjectRepository(User) private readonly userRepository: UserRepository) {}

        async updateUser(user: User) {
                if (typeof user._id == 'string') {
                        user._id = new ObjectId(user._id);
                }

                return await this.userRepository.save(user);
        }

        async findUserByField(field: keyof User, value: any): Promise<User> {
                return await this.userRepository.findOneByField(field, value);
        }
}
