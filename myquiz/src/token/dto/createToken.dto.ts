import { UserRole } from '../../auth/entities/userRole.enum';
import { ObjectId } from 'mongodb';

export class createTokenDto {
        userId: ObjectId;
        isPremium: boolean;
        role: UserRole;
}
