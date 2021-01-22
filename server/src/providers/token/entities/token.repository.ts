import { CusRepository } from '../../../common/interfaces/CusRepository';
import { EntityRepository } from 'typeorm';

//* Internal import
import { Token } from './token.entity';

@EntityRepository(Token)
export class TokenRepository extends CusRepository<Token> {}
