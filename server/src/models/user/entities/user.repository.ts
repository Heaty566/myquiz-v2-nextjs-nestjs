import { CusRepository } from '../../../common/interfaces/CusRepository';
import { EntityRepository } from 'typeorm';

//* Internal import
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends CusRepository<User> {}
