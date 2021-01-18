import * as React from 'react';
import Image from 'next/image';
import {
        HomeCardContainer,
        HomeCardImage,
        HomeCardItem,
        HomeCardList,
        HomeCardLink,
        HomeCardContent,
        HomeCardTitle,
        HomeCardWrapper,
        HomeCenterContainer,
        HomeCardMainTitle,
} from './style';

export interface HomeCardSubject {
        title: string;
        contentList: string[];
        imageSrc: string;
        link: string;
}

const homeCardSubjectData: HomeCardSubject[] = [
        {
                title: 'Sciences',
                contentList: ['Mathematic', ' Chemistry', 'Physical', 'Computer Science'],
                imageSrc: '/page/home/icons/card-sciences.svg',
                link: '/',
        },
        {
                title: 'Languages',
                contentList: ['English', 'Chinese', 'Vietnamese', 'Japanese'],
                imageSrc: '/page/home/icons/card-languages.svg',
                link: '/',
        },
        {
                title: 'Music',
                contentList: ['Electronic music', 'Hip hop', 'Retro', '90th'],
                imageSrc: '/page/home/icons/card-music.svg',
                link: '/',
        },

        {
                title: 'Others',
                contentList: ['Draw', 'Markets', 'Quantify', 'Infrastructures'],
                imageSrc: '/page/home/icons/card-others.svg',
                link: '/',
        },
        {
                title: 'Social Science',
                contentList: ['History', 'Geography', 'Social media', 'Multi media'],
                imageSrc: '/page/home/icons/card-social-science.svg',
                link: '/',
        },
        {
                title: 'Art',
                contentList: ['History Painting', 'Animal Painting', 'Portraits', 'Pixel Art'],
                imageSrc: '/page/home/icons/card-art.svg',
                link: '/',
        },
];

export interface HomeCenterProps {}

export const HomeCenter: React.FunctionComponent<HomeCenterProps> = () => {
        return (
                <HomeCenterContainer>
                        <HomeCardContainer>
                                <HomeCardMainTitle>Explore Your Favorite Subject</HomeCardMainTitle>
                                <HomeCardWrapper>
                                        {homeCardSubjectData.map((item) => (
                                                <HomeCardItem key={item.title}>
                                                        <HomeCardContent>
                                                                <HomeCardTitle>{item.title}</HomeCardTitle>
                                                                <HomeCardList>
                                                                        {item.contentList.map((childItem) => (
                                                                                <HomeCardLink key={childItem}>{childItem}</HomeCardLink>
                                                                        ))}
                                                                </HomeCardList>
                                                        </HomeCardContent>
                                                        <HomeCardImage>
                                                                <Image src={item.imageSrc} height="160" width="200" alt="ll" />
                                                        </HomeCardImage>
                                                </HomeCardItem>
                                        ))}
                                </HomeCardWrapper>
                        </HomeCardContainer>
                </HomeCenterContainer>
        );
};
