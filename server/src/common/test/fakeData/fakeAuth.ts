import { fakeData } from './fakeData';
import { CreateUserDto } from '../../../auth/dto/createUser.dto';
import { LoginUserDto } from '../../../auth/dto/loginUser.dto';
export const getCreateUserDto = () => {
        const password = fakeData(10, 'lettersAndNumbersLowerCase');
        const data: CreateUserDto = {
                fullName: fakeData(10, 'letters'),
                confirmPassword: password,
                username: fakeData(10, 'lettersAndNumbers'),
                password,
        };
        return data;
};

export const getLoginUserDto = () => {
        const data: LoginUserDto = {
                username: fakeData(10, 'lettersAndNumbersLowerCase'),
                password: fakeData(10, 'lettersAndNumbersLowerCase'),
        };
        return data;
};
