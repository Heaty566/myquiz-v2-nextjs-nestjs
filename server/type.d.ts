import { User as UserExtend } from './src/models/user/entities/user.entity';

declare global {
        namespace Express {
                export interface User extends UserExtend {}
        }
}
