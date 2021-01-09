import { ObjectId } from 'mongodb';
import { Token } from '../../src/token/entities/token.entity';

export const getDummyToken = () => {
        const token = new Token();

        token.data = String(new ObjectId());
        return token;
};
