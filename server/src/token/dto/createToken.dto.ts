import { ObjectId } from 'mongodb';

//* Internal import
import { UserRole } from '../../auth/entities/userRole.enum';

export class CreateTokenDto {
        userId: ObjectId;
        isPremium: boolean;
        role: UserRole;
}
