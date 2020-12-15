import { CreateTokenDto } from '../../../token/dto/createToken.dto';
import { UserRole } from '../../../auth/entities/userRole.enum';
import { ObjectId } from 'mongodb';

export const getCreateTokenDto = () => {
        const token = new CreateTokenDto();
        token.isPremium = false;
        token.role = UserRole.USER;
        token.userId = new ObjectId();
        return token;
};
