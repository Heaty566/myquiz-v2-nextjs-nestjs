import * as React from 'react';
import Image from 'next/image';

//* Style import
import { BannerBtn, BannerContainer, BannerContent, BannerImg, BannerSide, ContainerTop, HomeFeatureContainer } from './style';
import { Text } from '../../../style/typography';
import { Layout } from '../../../style/layout';
import { ImageFull, Box } from '../../../style/common';
import { CirclePagination } from '../../common/pagination';

export interface HomeTopProps {}

const HomeTop: React.FunctionComponent<HomeTopProps> = () => {
        return (
                <ContainerTop>
                        <Text $textAlign="center" $color="white" $type="h1">
                                Make Your Awesome Quiz And Become
                                <br />
                                Your Most Unstoppable Self
                        </Text>

                        <BannerContainer $justifyContent="space-around">
                                <BannerImg>
                                        <ImageFull src="/page/home/image/banner-top.png" alt="" height="350px" width="750px" className="hello" />
                                </BannerImg>
                                <BannerSide>
                                        <CirclePagination />
                                        <BannerContent>
                                                <Text as="h3" $type="h3" $color="white">
                                                        Organize your study
                                                </Text>
                                                <Text as="p" $type="p1" $color="white">
                                                        Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis
                                                        deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt
                                                        sint deserunt ut voluptate aute id deserunt nisi.
                                                </Text>
                                                <BannerBtn as="a">
                                                        <Text as="p" $type="p1" $color="white">
                                                                Learn more
                                                        </Text>
                                                        <Box $width="12px">
                                                                <Image src="/asset/icon/arrow-right.svg" alt="" height="12" width="12" />
                                                        </Box>
                                                </BannerBtn>
                                        </BannerContent>
                                </BannerSide>
                        </BannerContainer>

                        <HomeFeatureContainer>
                                <Text as="h3" $type="h3" $textAlign="center">
                                        MyQuiz Is A Great Platform To Build Your Awesome Quizzes
                                        <br />
                                        Explore Your Knowledge With Our Quizzes
                                </Text>

                                <Layout $alignItems="center" $justifyContent="space-between">
                                        <Text as="h4" $type="h4" $textAlign="center">
                                                1K
                                                <br />
                                                <span>{`> `}</span>
                                                STUDENTS
                                        </Text>
                                        <Text as="h4" $type="h4" $textAlign="center">
                                                3K
                                                <br />
                                                <span>{`> `}</span>
                                                QUIZZES
                                        </Text>
                                        <Text as="h4" $type="h4" $textAlign="center">
                                                8K
                                                <br />
                                                <span>{`> `}</span>
                                                HOURS EXAM
                                        </Text>
                                        <Text as="h4" $type="h4" $textAlign="center">
                                                500
                                                <br />
                                                <span>{`> `}</span>
                                                TEACHERS
                                        </Text>
                                </Layout>
                        </HomeFeatureContainer>
                </ContainerTop>
        );
};

export default HomeTop;
