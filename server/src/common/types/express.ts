import { Token } from '../../token/entities/token.entity';

declare global {
        namespace Express {
                export interface User extends Token {}
        }
}
