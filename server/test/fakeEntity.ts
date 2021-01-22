//* Internal import
import { fakeData } from './fakeData';
import { User } from '../src/models/user/entities/user.entity';
import { UserRole } from '../src/auth/entities/userRole.enum';
import { ObjectId } from 'mongodb';
import * as moment from 'moment';
import { Token } from '../src/providers/token/entities/token.entity';
import { Quiz } from '../src/models/quiz/entities/quiz.entity';
import { Question } from '../src/models/quiz/entities/question.entity';

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

export const fakeQuiz = () => {
        const generatorQuestion = () => {
                const question = new Question();
                question.question = fakeData(10);
                question.answers = [fakeData(10), fakeData(10), fakeData(10)];
                question.correctAnswers = [true, false, false];
                return question;
        };

        const quiz = new Quiz();
        quiz.createDate = moment().toDate();
        quiz.name = fakeData(10);
        quiz.questions = [generatorQuestion(), generatorQuestion(), generatorQuestion(), generatorQuestion()];
        return quiz;
};

export const fakeToken = () => {
        const token = new Token();

        token.data = String(new ObjectId());
        return token;
};
