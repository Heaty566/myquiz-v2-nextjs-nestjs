import { ObjectId } from 'mongodb';

//* Internal import
import { CreateTokenDto } from '../../src/token/dto/createToken.dto';
import { UserRole } from '../../src/auth/entities/userRole.enum';

export const getCreateTokenDto = () => {
        const token = new CreateTokenDto();
        token.isPremium = false;
        token.role = UserRole.USER;
        token.userId = new ObjectId();
        return token;
};
