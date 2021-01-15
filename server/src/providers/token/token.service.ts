import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'mongodb';
import * as moment from 'moment';

//* Internal import
import { TokenRepository } from './entities/token.repository';
import { Token } from './entities/token.entity';
import { User } from '../../models/user/entities/user.entity';
import { UserService } from '../../models/user/user.service';
@Injectable()
export class TokenService {
        constructor(
                @InjectRepository(Token) private readonly tokenRepository: TokenRepository,
                private readonly jwtService: JwtService,
                private readonly userService: UserService,
        ) {}

        async getValidToken(_id: string): Promise<Token> {
                try {
                        const token = await this.tokenRepository.findOne({ _id: new ObjectId(_id) });
                        if (!token) return null;

                        const isExpired = moment(token.expired).diff(moment(), 'minutes');
                        if (isExpired < 0) return null;
                        return token;
                } catch {
                        return null;
                }
        }

        async getAuthToken(_id: string): Promise<Token> {
                const token = await this.getValidToken(_id);
                if (!token) return null;

                const data = this.decodeJWT<{ _id: string }>(token.data);
                if (!data) return null;

                const user = await this.userService.findUserByField('_id', data._id);
                if (!user) return null;
                user.password = '';

                const newToken = new Token();

                newToken.data = this.generateJWT(user);
                newToken.expired = moment().add(5, 'minutes').toDate();

                return await this.tokenRepository.save(newToken);
        }

        generateJWT(data: Record<string, any>) {
                return this.jwtService.sign({ ...data }, { secret: process.env.JWT_SECRET_KEY });
        }

        decodeJWT<T>(encryptedString: string) {
                try {
                        return this.jwtService.decode(encryptedString) as T;
                } catch (err) {
                        return null;
                }
        }

        async getRefreshToken(data: User): Promise<string> {
                const token = new Token();
                token.data = this.generateJWT({ _id: data._id });
                token.expired = moment().add(6, 'months').toDate();

                const newToken = await this.tokenRepository.save(token);

                return String(newToken._id);
        }
}
