import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
        HomeCardContainer,
        HomeCardImage,
        HomeCardItem,
        HomeCardList,
        HomeCardListItem,
        HomeCardContent,
        HomeCardTitle,
        HomeCardWrapper,
        HomeCenterContainer,
        HomeCardMainTitle,
        HomeFeatureContainer,
        HomeFeatureItem,
        HomeFeatureMainTitle,
        HomeFeatureText,
        HomeFeatureTitle,
        HomeFeatureImage,
        HomeFeatureWrapper,
        HomeCardListText,
} from './style';

export interface HomeCardSubject {
        title: string;
        contentList: string[];
        imageSrc: string;
        link: string;
}

export interface HomeFeature {
        title: string;
        text: string;
        imageSrc: string;
}

const homeCardSubjectData: HomeCardSubject[] = [
        {
                title: 'Sciences',
                contentList: ['Mathematic', ' Chemistry', 'Physical', 'Computer Science'],
                imageSrc: '/page/home/icons/card-sciences.svg',
                link: '/quiz?genre=sciences?page=0',
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

const homeFeatureData: HomeFeature[] = [
        {
                title: 'Speed Up Your Brain',
                imageSrc: '/page/home/icons/card-brain.svg',
                text:
                        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        },
        {
                title: 'Master A Top Mindset',
                imageSrc: '/page/home/icons/card-brain-process.svg',
                text:
                        'Arketing migration orchestrator driver pennsylvania frozen azure indexing sudan ssl ssl withdrawal guatemala officer e-services rupee table forward json transparent olive interface installation ergonomic tasty .cambridgeshire.',
        },
        {
                title: 'Prepare for exams',
                imageSrc: '/page/home/icons/card-achieve.svg',
                text:
                        'Frastructure skyway bifurcated ohio practical gorgeous grove tuna attitude concrete connecting national home equatorial dobra deposit eyeballs unbranded taka corporate teal functionalities program tactics wooden workforce cross-platform soft.',
        },
        {
                title: 'Achive Your Goals',
                imageSrc: '/page/home/icons/card-goal.svg',
                text:
                        'operations moratorium ram up forest evolve investor dakota avon grove account practical indexing account pants analyst infrastructure relationships car islands markets payment emulation usb ftp sms louisiana national olive networks chicken kids pinindustrial tuna multi-lateral',
        },
        {
                title: 'Share Your  Knowledge',
                imageSrc: '/page/home/icons/card-link.svg',
                text:
                        'Igitized liberia practical redundant vietnam target purple bus rustic guinea shirt hack bike programming quality organized innovate tactics rubber port national enhance user-centric buckinghamshire steel digitized.',
        },
        {
                title: 'Explore Our Category',
                imageSrc: '/page/home/icons/card-compass.svg',
                text:
                        'baby tan investment accounts backing sausages synergies savings towels product matrix quantify granite parse applications wall keyboard outdoors lesotho accountability deposit sql account fish forward synthesizing',
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
                                                <Link href="/" key={item.title}>
                                                        <HomeCardItem href="/">
                                                                <HomeCardContent>
                                                                        <HomeCardTitle>{item.title}</HomeCardTitle>
                                                                        <HomeCardList>
                                                                                {item.contentList.map((childItem) => (
                                                                                        <HomeCardListItem key={childItem}>
                                                                                                <HomeCardListText>{childItem}</HomeCardListText>
                                                                                        </HomeCardListItem>
                                                                                ))}
                                                                        </HomeCardList>
                                                                </HomeCardContent>
                                                                <HomeCardImage>
                                                                        <Image src={item.imageSrc} height="160" width="200" alt={item.title} />
                                                                </HomeCardImage>
                                                        </HomeCardItem>
                                                </Link>
                                        ))}
                                </HomeCardWrapper>
                        </HomeCardContainer>

                        <HomeFeatureContainer>
                                <HomeFeatureMainTitle>Why MyQuiz is for you?</HomeFeatureMainTitle>
                                <HomeFeatureWrapper>
                                        {homeFeatureData.map((item) => (
                                                <HomeFeatureItem key={item.title}>
                                                        <HomeFeatureImage>
                                                                <Image src={item.imageSrc} alt={item.title} height="64" width="64" />
                                                        </HomeFeatureImage>
                                                        <HomeFeatureTitle>{item.title}</HomeFeatureTitle>
                                                        <HomeFeatureText>{item.text}</HomeFeatureText>
                                                </HomeFeatureItem>
                                        ))}
                                </HomeFeatureWrapper>
                        </HomeFeatureContainer>
                </HomeCenterContainer>
        );
};

export default HomeCenter;
