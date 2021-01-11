import { Repository, EntityRepository } from 'typeorm';

//* Internal import
import { Token } from './token.entity';

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {}
