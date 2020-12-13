import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { TokenRepository } from './entities/token.repository';
import { createTokenDto } from './dto/createToken.dto';
import * as moment from 'moment';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
        constructor(@InjectRepository(Token) private readonly tokenRepository: TokenRepository, private readonly jwtService: JwtService) {}
        async getAuthToken(value: string): Promise<string> {
                try {
                        const data = this.jwtService.decode(value);
                        if (typeof data === 'object') {
                                const isExpired = moment(data.expiredDate).diff(moment(), 'minutes');
                                if (isExpired > 0) {
                                        const token = await this.tokenRepository.findOne({ _id: data.data });
                                        if (!token) return null;
                                }
                        }
                } catch (_) {
                        return null;
                }
                return null;
        }
        async getRefershToken({ isPremium, role, userId }: createTokenDto) {
                const token = new Token();
                token.isPremium = isPremium;
                token.role = role;
                token.userId = userId;
                token.expiredDate = moment()
                        .add(6, 'months')
                        .toDate();
                const newToken = await this.tokenRepository.save(token);

                return this.jwtService.sign({ data: newToken._id, expiredDate: token.isPremium }, { secret: '132' });
        }
}
