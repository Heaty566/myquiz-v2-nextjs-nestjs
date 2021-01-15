import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Token {
        @ObjectIdColumn()
        _id: ObjectId;

        @Column()
        data: string;

        @Column()
        expired: Date;
}
