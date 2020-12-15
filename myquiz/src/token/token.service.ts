import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { TokenRepository } from './entities/token.repository';
import { CreateTokenDto } from './dto/createToken.dto';
import * as moment from 'moment';
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'mongodb';

@Injectable()
export class TokenService {
        constructor(@InjectRepository(Token) private readonly tokenRepository: TokenRepository, private readonly jwtService: JwtService) {}
        async getAuthToken(value: string): Promise<string> {
                try {
                        const data = this.jwtService.decode(value);

                        if (typeof data === 'object') {
                                const isExpired = moment(data.expiredDate).diff(moment(), 'minutes');
                                if (isExpired > 0) {
                                        const token = await this.tokenRepository.findOne({ _id: new ObjectId(data.data) });
                                        if (!token) return null;
                                        const encryptString = this.jwtService.sign({ ...token }, { secret: process.env.JWT_SECRET_KEY });

                                        return encryptString;
                                }
                        }
                } catch (_) {
                        return null;
                }
                return null;
        }

        async getRefershToken({ isPremium, role, userId }: CreateTokenDto) {
                const token = new Token();
                token.isPremium = isPremium;
                token.role = role;
                token.userId = userId;
                token.expiredDate = moment().add(6, 'months').toDate();
                const newToken = await this.tokenRepository.save(token);

                return this.jwtService.sign({ data: newToken._id, expiredDate: token.expiredDate }, { secret: process.env.JWT_SECRET_KEY });
        }
}
