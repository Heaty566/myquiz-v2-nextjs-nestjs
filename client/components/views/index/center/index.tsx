import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CategoryContainer, FeatureContainer, CategoryCard, ICenterContainer, FeatureCard } from './style';
import { Layout } from '../../../../style/layout';
import { Box } from '../../../../style/common';
import { Text } from '../../../../style/typography';

export interface HomeCenterProps {}
export interface CategoryCardProps {
        title: string;
        contentList: string[];
        imageSrc: string;
        link: string;
}

export interface FeatureCardProps {
        title: string;
        content: string;
        imageSrc: string;
}

const CategoryCardComponent: React.FunctionComponent<CategoryCardProps> = ({ contentList = [], imageSrc = '', title = '', link = '#' }) => {
        return (
                <Link href={link}>
                        <CategoryCard $justifyContent="space-between" $alignItems="center">
                                <Box>
                                        <Text as="h3" $type="h3">
                                                {title}
                                        </Text>
                                        {contentList.map((item) => (
                                                <Text as="p" $type="p1" key={item}>
                                                        {item}
                                                </Text>
                                        ))}
                                </Box>
                                <Box>
                                        <Image src={imageSrc} alt={title} height="172px" width="167" />
                                </Box>
                        </CategoryCard>
                </Link>
        );
};

const FeatureCardComponent: React.FunctionComponent<FeatureCardProps> = ({ content, imageSrc, title }) => {
        return (
                <FeatureCard>
                        <Image src={imageSrc} alt={title} height="64px" width="64px" />
                        <Text $type="h3" as="h3">
                                {title}
                        </Text>

                        <Text $type="p3" as="p">
                                {content}
                        </Text>
                </FeatureCard>
        );
};

const categoriesData: CategoryCardProps[][] = [
        [
                {
                        title: 'Sciences',
                        contentList: ['Mathematic', ' Chemistry', 'Physical', 'Computer Science'],
                        imageSrc: '/page/home/icon/card-sciences.svg',
                        link: '/',
                },
                {
                        title: 'Languages',
                        contentList: ['English', 'Chinese', 'Vietnamese', 'Japanese'],
                        imageSrc: '/page/home/icon/card-languages.svg',
                        link: '/',
                },
                {
                        title: 'Music',
                        contentList: ['Electronic music', 'Hip hop', 'Retro', '90th'],
                        imageSrc: '/page/home/icon/card-music.svg',
                        link: '/',
                },
        ],
        [
                {
                        title: 'Others',
                        contentList: ['Draw', 'Markets', 'Quantify', 'Infrastructures'],
                        imageSrc: '/page/home/icon/card-others.svg',
                        link: '/',
                },
                {
                        title: 'Social Science',
                        contentList: ['History', 'Geography', 'Social media', 'Multi media'],
                        imageSrc: '/page/home/icon/card-social-science.svg',
                        link: '/',
                },
                {
                        title: 'Art',
                        contentList: ['History Painting', 'Animal Painting', 'Portraits', 'Pixel Art'],
                        imageSrc: '/page/home/icon/card-art.svg',
                        link: '/',
                },
        ],
];

const featuresData: FeatureCardProps[][] = [
        [
                {
                        imageSrc: '/page/home/icon/card-brain.svg',
                        title: 'Speed Up Your Brain',
                        content:
                                'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
                },
                {
                        imageSrc: '/page/home/icon/card-brain-process.svg',
                        title: 'Master A Top Mindset',
                        content:
                                'Arketing migration orchestrator driver pennsylvania frozen azure indexing sudan ssl ssl withdrawal guatemala officer e-services rupee table forward json transparent olive interface installation ergonomic tasty .cambridgeshire.',
                },
                {
                        imageSrc: '/page/home/icon/card-achive.svg',
                        title: 'Prepare for exams',
                        content:
                                'Frastructure skyway bifurcated ohio practical gorgeous grove tuna attitude concrete connecting national home equatorial dobra deposit eyeballs unbranded taka corporate teal functionalities program tactics wooden workforce cross-platform soft.',
                },
        ],
        [
                {
                        imageSrc: '/page/home/icon/card-goal.svg',
                        title: 'Achive Your Goals',
                        content:
                                'operations moratorium ram up forest evolve investor dakota avon grove account practical indexing account pants analyst infrastructure relationships car islands markets payment emulation usb ftp sms louisiana national olive networks chicken kids pinindustrial tuna multi-lateral',
                },
                {
                        imageSrc: '/page/home/icon/card-link.svg',
                        title: 'Share Your  Knowledge',
                        content:
                                'Igitized liberia practical redundant vietnam target purple bus rustic guinea shirt hack bike programming quality organized innovate tactics rubber port national enhance user-centric buckinghamshire steel digitized.',
                },
                {
                        imageSrc: '/page/home/icon/card-compass.svg',
                        title: 'Explore Our Category',
                        content:
                                'baby tan investment accounts backing sausages synergies savings towels product matrix quantify granite parse applications wall keyboard outdoors lesotho accountability deposit sql account fish forward synthesizing',
                },
        ],
];

const HomeCenter: React.FunctionComponent<HomeCenterProps> = () => {
        return (
                <ICenterContainer>
                        <CategoryContainer as="section" $alignItems="center" $justifyContent="center" $flexDirection="column">
                                {categoriesData.map((col, index) => (
                                        <Layout $justifyContent="center" $gutter={8} $alignItems="center" key={index}>
                                                {col.map((item) => (
                                                        <CategoryCardComponent
                                                                key={item.title}
                                                                contentList={item.contentList}
                                                                imageSrc={item.imageSrc}
                                                                title={item.title}
                                                                link={item.link}
                                                        />
                                                ))}
                                        </Layout>
                                ))}
                        </CategoryContainer>
                        <FeatureContainer>
                                <Text as="h1" $type="h1" $textAlign="center">
                                        Why MyQuiz is for you?
                                </Text>
                                {featuresData.map((col, index) => (
                                        <Layout $justifyContent="center" key={index} $gutter={8} $alignItems="center">
                                                {col.map((item) => (
                                                        <FeatureCardComponent
                                                                content={item.content}
                                                                imageSrc={item.imageSrc}
                                                                title={item.title}
                                                                key={item.title}
                                                        />
                                                ))}
                                        </Layout>
                                ))}
                        </FeatureContainer>
                </ICenterContainer>
        );
};

export default HomeCenter;
