import { User as UserExtend } from './src/user/entities/user.entity';

declare global {
        namespace Express {
                export interface User extends UserExtend {}
        }
}
