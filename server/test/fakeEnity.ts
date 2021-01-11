//* Internal import
import { fakeData } from './fakeData';
import { User } from '../src/user/entities/user.entity';
import { UserRole } from '../src/auth/entities/userRole.enum';
import { ObjectId } from 'mongodb';
import { Token } from '../src/token/entities/token.entity';

export const fakeUser = () => {
        const user = new User();
        user.fullName = fakeData(10, 'lettersLowerCase');
        user.username = fakeData(10, 'lettersAndNumbersLowerCase');
        user.password = fakeData(10, 'lettersAndNumbersLowerCase');
        user.googleId = fakeData(10, 'lettersAndNumbersLowerCase');
        user.facebookId = fakeData(10, 'lettersAndNumbersLowerCase');
        user.githubId = fakeData(10, 'lettersAndNumbersLowerCase');
        user.isPremium = true;
        user.email = fakeData(10, 'lettersAndNumbersLowerCase') + '@gmail.com';
        user.role = UserRole.USER;
        return user;
};

export const fakeToken = () => {
        const token = new Token();

        token.data = String(new ObjectId());
        return token;
};
