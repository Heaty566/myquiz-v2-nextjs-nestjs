import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

//* Internal import
import { UserRepository } from '../user/entities/userRepository.entity';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
@Injectable()
export class AuthService {
        constructor(@InjectRepository(User) private readonly userRepository: UserRepository) {}

        async encryptString(value: string, rounds = 10) {
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

        async createNewUserByOtherProvider(fullName: string, id: string, type: 'googleId' | 'githubId' | 'facebookId') {
                const user = new User();
                user.fullName = fullName;
                user[type] = id;

                return await this.userRepository.save(user);
        }
}
