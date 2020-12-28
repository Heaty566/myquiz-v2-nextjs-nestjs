import React from 'react';
import { HeadMeta } from '../components/head';

//* Style import
import { ImageFull } from '../style/common';
import { Layout } from '../style/grid';
import { HomeContainerTop, HomeBannerContainer, HomeBannerImage, HomeBannerSide, HomeBannerContent, HomeBannerBtn } from '../style/home';
import { Text } from '../style/typography';
import { Pagination } from '../components/pagination';
import { Box } from '../style/utils';

export interface IndexProps {}

export const HomePage: React.FunctionComponent<IndexProps> = () => {
        return (
                <>
                        <HeadMeta pageTitle="hello" description="GEGE" />
                        <HomeContainerTop>
                                <Text $textAlign="center" $color="white" $type="h1">
                                        Make Your Awesome Quiz And Become
                                        <br />
                                        Your Most Unstoppable Self
                                </Text>

                                <HomeBannerContainer>
                                        <Layout $justifyContent="space-between" $alignItems="stretch">
                                                <HomeBannerImage>
                                                        <ImageFull src="/page/home/image/banner-top.png" alt="" />
                                                </HomeBannerImage>
                                                <HomeBannerSide>
                                                        <Pagination />
                                                        <HomeBannerContent>
                                                                <Text as="h3" $type="h3" $color="white">
                                                                        Organize your study
                                                                </Text>
                                                                <Text as="p" $type="p1" $color="white">
                                                                        Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse
                                                                        pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure
                                                                        tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.
                                                                </Text>
                                                                <HomeBannerBtn>
                                                                        <Text as="p" $type="p1" $color="white">
                                                                                Learn more
                                                                        </Text>
                                                                        <Box $width="12px">
                                                                                <ImageFull src="/icon/arrow-right.svg" alt="" />
                                                                        </Box>
                                                                </HomeBannerBtn>
                                                        </HomeBannerContent>
                                                </HomeBannerSide>
                                        </Layout>
                                </HomeBannerContainer>
                        </HomeContainerTop>
                </>
        );
};

export default HomePage;
