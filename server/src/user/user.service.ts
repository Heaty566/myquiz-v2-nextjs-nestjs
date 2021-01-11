import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';

//* Internal import
import { UserRepository } from './entities/userRepository.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
        constructor(@InjectRepository(User) private readonly userRepository: UserRepository) {}

        async updateUser(user: User) {
                return await this.userRepository.save(user);
        }

        async findUserByField(field: keyof User, value: any): Promise<User> {
                if (field === '_id') {
                        return await this.userRepository.findOne({ _id: new ObjectId(value) });
                }

                return await this.userRepository.findOne({ [`${field}`]: value });
        }
}
