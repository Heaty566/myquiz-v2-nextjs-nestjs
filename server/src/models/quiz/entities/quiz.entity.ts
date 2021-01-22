import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { Question } from './question.entity';
import * as moment from 'moment';

@Entity()
export class Quiz {
        @ObjectIdColumn()
        _id: ObjectId;

        @Column()
        name: string;

        @Column()
        userId: ObjectId;

        @Column()
        createDate: Date;

        @Column()
        questions: Array<Question>;

        constructor() {
                this.createDate = moment().toDate();
                this.questions = [];
        }
}
