import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

//* Internal import
import { UserRepository } from '../models/user/entities/user.repository';
import { User } from '../models/user/entities/user.entity';
import { CusService } from '../common/interfaces/CusService';
@Injectable()
export class AuthService extends CusService<User> {
        constructor(@InjectRepository(User) private readonly userRepository: UserRepository) {
                super(userRepository);
        }

        /**
         * @param value The string that you want to encrypt
         * @param rounds The complexity of encrypt string (recommend > 10)
         * @returns An encrypted string
         * @default rounds 10
         */
        async encryptString(value: string, rounds = 10) {
                const salt = await bcrypt.genSalt(rounds);
                return await bcrypt.hash(value, salt);
        }

        /**
         * @param value current string to compare
         * @param encryptString encrypt string that you want to compare with value
         * @returns boolean
         */
        async compareEncrypt(value: string, encryptString: string) {
                return await bcrypt.compare(value, encryptString);
        }

        /**
         * @description create a new user who login from Google Facebook Github
         */
        async createNewUserByOtherProvider(fullName: string, id: string, type: 'googleId' | 'githubId' | 'facebookId') {
                const user = new User();
                user.fullName = fullName;
                user[type] = id;

                return await this.userRepository.save(user);
        }
}
