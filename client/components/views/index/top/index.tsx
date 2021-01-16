import React from 'react';
import Image from 'next/image';

//* Import
import { BannerBtn, BannerContainer, BannerContent, BannerImg, BannerSide, ITopContainer, HomeFeatureContainer, ImgWrapper } from './style';
import { limitStringLength } from '../../../../helper/stringFormat';
import { useSlideShow } from '../../../../hooks/useSlideShow';
import { CirclePagination } from '../../../common/pagination';
import { Text } from '../../../../style/typography';
import { Layout } from '../../../../style/layout';
import { Box } from '../../../../style/common';
export interface HomeTopProps {}

const slideData = [
        {
                title: 'Organize Your Study',
                imageUrl: '/page/home/image/slide-1.png',
                content:
                        'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.',
        },
        {
                title: 'Lectronics Backing Payment',
                imageUrl: '/page/home/image/slide-2.png',
                content:
                        'eneric paraguay handcrafted array concrete kina mobile garden silver tuna dollar music home driver emulation online invoice high-level disintermediate islands invoice tasty central portals bacon reboot sas account web-enabled savings granular chips analyzing licensed rustic generation kyat square district synergized moldovan navigating uzbekistan indiana assimilated delaware handcrafted account fully-configurable mesh firewall rica turkey connecting optimize accountability solution-oriented leu lats pink human fresh-thinking.',
        },
        {
                title: 'Parallelism Alley Facilitator',
                imageUrl: '/page/home/image/slide-3.png',
                content:
                        'ixel electronics asynchronous plum clicks-and-mortar hybrid communities bypass washington generating wireless computers account forecast pants virginia georgia land interface dynamic success ball credit direct repurpose bedfordshire awesome consultant quantifying incredible sausages clothing clicks-and-mortar robust connecting tactics even-keeled bike neural organic process books architect enable digital practical.',
        },
        {
                title: 'Developer Representative Games',
                imageUrl: '/page/home/image/slide-4.png',
                content:
                        'ivide transmitting incubate payment indexing accountability specialist electronics soft producer overriding global expedite indiana pci viaduct sausages small dynamic sleek recontextualize compress tcp programmable franc concrete cotton',
        },
        {
                title: 'Interface Programming Parsing',
                imageUrl: '/page/home/image/slide-5.png',
                content:
                        'orest burgs awesome liaison fresh international ptimization operations virtual partnerships withdrawal dobra supply-chains white idaho microchip multi-channelled agent mobile car lime thx function-based account exe rubber borders garden up-sized steel tasty multi-state 1080p index greenland fuchsia analyzing payment specialist thx withdrawal forward payment borders object-oriented fresh christmas transition.',
        },
];

const HomeTop: React.FunctionComponent<HomeTopProps> = () => {
        const [setClassName, setCurrentSlide, currentSlide] = useSlideShow(5, 5000);

        return (
                <ITopContainer>
                        <Text $textAlign="center" $color="white" $type="h1">
                                Make Your Awesome Quiz And Become
                                <br />
                                Your Most Unstoppable Self
                        </Text>

                        <BannerContainer $justifyContent="space-around">
                                <BannerImg>
                                        <ImgWrapper>
                                                {slideData.map((item, index) => {
                                                        return (
                                                                <div className={`slide ${setClassName(index)}`} key={item.title}>
                                                                        <Image
                                                                                src={item.imageUrl}
                                                                                height="350px"
                                                                                width="750px"
                                                                                objectFit="cover"
                                                                                layout="responsive"
                                                                        />
                                                                </div>
                                                        );
                                                })}
                                        </ImgWrapper>
                                </BannerImg>
                                <BannerSide>
                                        <CirclePagination length={5} current={currentSlide} setCurrent={setCurrentSlide} />
                                        <BannerContent>
                                                <Text as="h3" $type="h3" $color="white">
                                                        {limitStringLength(slideData[currentSlide].title, 25)}
                                                </Text>
                                                <Text as="p" $type="p1" $color="white">
                                                        {limitStringLength(slideData[currentSlide].content, 230)}
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
                </ITopContainer>
        );
};

export default HomeTop;
