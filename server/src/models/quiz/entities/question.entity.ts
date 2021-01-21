import { Column } from 'typeorm';

export class Question {
        @Column()
        question: string;

        @Column()
        answers: string[];

        @Column()
        correctAnswers: boolean[];
}
