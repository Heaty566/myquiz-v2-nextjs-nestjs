import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';
import { UserRole } from '../../auth/entities/userRole.enum';

@Entity()
export class User {
        @ObjectIdColumn()
        _id: ObjectId;

        @Column()
        fullName: string;

        @Column()
        username: string;

        @Column()
        password: string;

        @Column()
        email: string;

        @Column()
        avatarUrl: string;

        @Column()
        googleId: string;

        @Column()
        facebookId: string;

        @Column()
        githubId: string;

        @Column()
        isPremium: boolean;

        @Column()
        role: UserRole;
        constructor(username: string, password: string, fullname: string) {
                this.username = username;
                this.password = password;
                this.fullName = fullname;
                this.email = '';
                this.avatarUrl = '';
                this.googleId = '';
                this.facebookId = '';
                this.githubId = '';
                this.isPremium = false;
                this.role = UserRole.USER;
        }
}
