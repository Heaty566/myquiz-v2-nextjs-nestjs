import { UserRole } from '../../auth/entities/userRole.enum';
import { ObjectId } from 'mongodb';

export class CreateTokenDto {
        userId: ObjectId;
        isPremium: boolean;
        role: UserRole;
}
