import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/entities/userRepository.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

@Injectable()
export class AuthService {
        constructor(@InjectRepository(User) private readonly userRepository: UserRepository) {}

        async findUserByField(field: keyof User, value: any): Promise<User> {
                if (field === '_id') {
                        return await this.userRepository.findOne({ _id: new ObjectId(value) });
                }

                const user = await this.userRepository.findOne({ [`${field}`]: value });

                return user;
        }
        private async encryptString(value: string, rounds = 10) {
                const salt = await bcrypt.genSalt(rounds);
                return await bcrypt.hash(value, salt);
        }

        async compareEncrypt(value: string, encryptString: string) {
                return await bcrypt.compare(value, encryptString);
        }

        async createNewUser({ fullName, username, password }: CreateUserDto) {
                const encryptedPassword = await this.encryptString(password);
                const user = new User(username, encryptedPassword, fullName);

                return await this.userRepository.save(user);
        }
}
