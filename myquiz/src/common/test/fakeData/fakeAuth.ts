import { CreateUserDto } from '../../../auth/dto/CreateUser.dto';
import { fakeData } from './fakeData';

export const getCreateUserDto = () => {
        const password = fakeData(10, 'lettersAndNumbersLowerCase');
        const data: CreateUserDto = {
                fullname: fakeData(10, 'letters'),
                confirmPassword: password,
                username: fakeData(10, 'lettersAndNumbers'),
                password,
        };
        return data;
};
