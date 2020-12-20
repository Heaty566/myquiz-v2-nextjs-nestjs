import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';
import { UserRole } from '../../auth/entities/userRole.enum';

@Entity()
export class Token {
        @ObjectIdColumn()
        _id: ObjectId;

        @Column()
        userId: ObjectId;

        @Column()
        role: UserRole;

        @Column()
        isPremium: boolean;

        @Column()
        expiredDate: Date;
}
