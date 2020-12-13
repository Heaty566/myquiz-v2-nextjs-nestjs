import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/entities/userRepository.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from './dto/CreateUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
        constructor(@InjectRepository(User) private readonly userRepository: UserRepository) {}

        async findUserByField(field: keyof User, value: any): Promise<User> {
                const user = await this.userRepository.findOne({ [`${field}`]: value });
                return user;
        }
        private async encryptString(value: string, rounds = 10) {
                const salt = await bcrypt.genSalt(rounds);
                return await bcrypt.hash(value, salt);
        }

        private async compareEncrypt(value: string, encryptString: string) {
                return await bcrypt.compare(value, encryptString);
        }

        async createNewUser({ fullname, username, password }: CreateUserDto) {
                const encryptedPassword = await this.encryptString(password);
                const user = new User(username, encryptedPassword, fullname);

                return await this.userRepository.save(user);
        }
}
