import { EntityRepository, Repository } from 'typeorm';

//* Internal import
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
