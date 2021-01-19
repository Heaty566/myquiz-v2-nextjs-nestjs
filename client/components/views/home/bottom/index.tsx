import * as React from 'react';
import Image from 'next/image';
import { BtnLink } from '../../../btnLink';
import {
        HomeBottomContainer,
        HomeMemberCardContainer,
        HomeMemberCardItem,
        HomeMemberCardList,
        HomeMemberCardListItem,
        HomeMemberCardMainTitle,
        HomeMemberCardPrice,
        HomeMemberCardTitle,
        HomeMemberCardWrapper,
        HomeMemberCardSubTitle,
        HomeQuizCardContainer,
        HomeQuizCardAuthor,
        HomeQuizCardCounter,
        HomeQuizCardMainTitle,
        HomeQuizCardQuestion,
        HomeQuizCardBottom,
        HomeQuizCardItem,
        HomeQuizCardTitle,
        HomeQuizCardWrapper,
} from './style';

interface MemberCard {
        title: string;
        price: number;
        btnLabel: string;
        url: string;
        subTitle: string;
        type: 'one' | 'two';
        listFeatures: string[];
}

const memberCardData: MemberCard[] = [
        {
                btnLabel: 'Build You Quiz Now',
                listFeatures: ['Offline Access', 'Unlimited Create Quizzes', 'Unlimited Take Exams', '24/7 Support'],
                price: 0,
                subTitle: 'Features include:',
                title: 'Free',
                url: '/',
                type: 'two',
        },
        {
                btnLabel: 'Get started',
                listFeatures: ['Create Real Time Exam', 'Student Reports', 'Live Stream Video', 'Create Class, And Course', 'Rich Text Formatting'],
                price: 10,
                subTitle: 'Everything in Free, plus:',
                title: 'Membership',
                url: '/',
                type: 'one',
        },
];

interface QuizCard {
        title: string;
        author: string;
        star: number;
        questions: number;
        url: string;
}

const quizCardData: QuizCard[] = [
        {
                title: 'Chap 1: Introduction to group communication',
                author: 'Floyd Miles',
                questions: 13,
                star: 433,
                url: '/',
        },
        {
                title: 'Chap 2: Introduction to group communication',
                author: 'Floyd Miles',
                questions: 13,
                star: 433,
                url: '/',
        },
        {
                title: 'Chap 3: Introduction to group communication',
                author: 'Floyd Miles',
                questions: 13,
                star: 433,
                url: '/',
        },
        {
                title: 'Chap 4: Introduction to group communication',
                author: 'Floyd Miles',
                questions: 13,
                star: 433,
                url: '/',
        },
        {
                title: 'Chap 5: Introduction to group communication',
                author: 'Floyd Miles',
                questions: 13,
                star: 433,
                url: '/',
        },
        {
                title: 'Chap 6: Introduction to group communication',
                author: 'Floyd Miles',
                questions: 13,
                star: 433,
                url: '/',
        },
        {
                title: 'Chap 7: Introduction to group communication',
                author: 'Floyd Miles',
                questions: 13,
                star: 433,
                url: '/',
        },
        {
                title: 'Chap 8: Introduction to group communication',
                author: 'Floyd Miles',
                questions: 13,
                star: 433,
                url: '/',
        },
        {
                title: 'Chap 9: Introduction to group communication',
                author: 'Floyd Miles',
                questions: 13,
                star: 433,
                url: '/',
        },
];

export interface HomeBottomProps {}

export const HomeBottom: React.FunctionComponent<HomeBottomProps> = () => {
        return (
                <HomeBottomContainer>
                        <HomeQuizCardContainer>
                                <HomeQuizCardMainTitle>Trending on MyQuiz</HomeQuizCardMainTitle>
                                <HomeQuizCardWrapper>
                                        {quizCardData.map((item) => (
                                                <HomeQuizCardItem href={item.url} key={item.title}>
                                                        <HomeQuizCardTitle>{item.title}</HomeQuizCardTitle>
                                                        <HomeQuizCardAuthor>{item.author}</HomeQuizCardAuthor>
                                                        <HomeQuizCardBottom>
                                                                <HomeQuizCardQuestion>{item.questions} Questions</HomeQuizCardQuestion>
                                                                <HomeQuizCardCounter>
                                                                        <Image
                                                                                src="/asset/icons/star.svg"
                                                                                alt={`${item.questions} stars`}
                                                                                height="20"
                                                                                width="20"
                                                                        />
                                                                        <span>{item.star}</span>
                                                                </HomeQuizCardCounter>
                                                        </HomeQuizCardBottom>
                                                </HomeQuizCardItem>
                                        ))}
                                </HomeQuizCardWrapper>
                        </HomeQuizCardContainer>

                        <HomeMemberCardContainer>
                                <HomeMemberCardMainTitle>Create your awesome quizzes. Start for free.</HomeMemberCardMainTitle>
                                <HomeMemberCardWrapper>
                                        {memberCardData.map((item) => (
                                                <HomeMemberCardItem key={item.title} $type={item.type}>
                                                        <HomeMemberCardTitle>{item.title}</HomeMemberCardTitle>
                                                        <HomeMemberCardPrice>
                                                                <strong>$ {item.price}</strong> <span>/ Month</span>
                                                        </HomeMemberCardPrice>
                                                        <BtnLink label={item.btnLabel} url={item.url} />
                                                        <HomeMemberCardSubTitle>{item.subTitle}</HomeMemberCardSubTitle>
                                                        <HomeMemberCardList>
                                                                {item.listFeatures.map((childItem) => (
                                                                        <HomeMemberCardListItem key={childItem}>
                                                                                <Image
                                                                                        src="/asset/icons/check.svg"
                                                                                        alt={childItem}
                                                                                        height="24"
                                                                                        width="24"
                                                                                />
                                                                                {childItem}
                                                                        </HomeMemberCardListItem>
                                                                ))}
                                                        </HomeMemberCardList>
                                                </HomeMemberCardItem>
                                        ))}
                                </HomeMemberCardWrapper>
                        </HomeMemberCardContainer>
                </HomeBottomContainer>
        );
};

export default HomeBottom;
