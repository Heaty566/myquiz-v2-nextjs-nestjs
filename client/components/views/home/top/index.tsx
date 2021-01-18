import * as React from 'react';
import Image from 'next/image';

//* Import
import { CirclePagination } from '../../../pagination/circlePagination';
import { useSlideShow, SlideItem } from '../../../../hooks/useSlideShow';
import {
        HomeTopContainer,
        HomeTopTitle,
        HomeSlideImage,
        HomeSlideShowContainer,
        HomeSlideContent,
        HomeSlideTitle,
        HomeSlideText,
        HomeSlideLink,
        HomeSlideItem,
        HomeCounterContainer,
        HomeCounterItemTitle,
        HomeCounterItemText,
        HomeCounterWrapper,
        HomeCounterTitle,
        HomeCounterItem,
} from './style';
export interface HomeTopProps {}

interface SlideData extends SlideItem {
        title: string;
        imageUrl: string;
        content: string;
}

const slideData: SlideData[] = [
        {
                _id: 0,
                title: 'Organize Your Study',
                imageUrl: '/page/home/images/slide-1.png',
                content:
                        'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.',
        },
        {
                _id: 1,
                title: 'Slide 1',
                imageUrl: '/page/home/images/slide-2.png',
                content:
                        'eneric paraguay handcrafted array concrete kina mobile garden silver tuna dollar music home driver emulation online invoice high-level disintermediate islands invoice tasty central portals bacon reboot sas account web-enabled savings granular chips analyzing licensed rustic generation kyat square district synergized moldovan navigating uzbekistan indiana assimilated delaware handcrafted account fully-configurable mesh firewall rica turkey connecting optimize accountability solution-oriented leu lats pink human fresh-thinking.',
        },
        {
                _id: 2,
                title: 'Slide 2',
                imageUrl: '/page/home/images/slide-3.png',
                content:
                        'ixel electronics asynchronous plum clicks-and-mortar hybrid communities bypass washington generating wireless computers account forecast pants virginia georgia land interface dynamic success ball credit direct repurpose bedfordshire awesome consultant quantifying incredible sausages clothing clicks-and-mortar robust connecting tactics even-keeled bike neural organic process books architect enable digital practical.',
        },
        {
                _id: 3,
                title: 'Slide 3',
                imageUrl: '/page/home/images/slide-4.png',
                content:
                        'ivide transmitting incubate payment indexing accountability specialist electronics soft producer overriding global expedite indiana pci viaduct sausages small dynamic sleek recontextualize compress tcp programmable franc concrete cotton',
        },
        {
                _id: 4,
                title: 'Slide 4',
                imageUrl: '/page/home/images/slide-5.png',
                content:
                        'orest burgs awesome liaison fresh international ptimization operations virtual partnerships withdrawal dobra supply-chains white idaho microchip multi-channelled agent mobile car lime thx function-based account exe rubber borders garden up-sized steel tasty multi-state 1080p index greenland fuchsia analyzing payment specialist thx withdrawal forward payment borders object-oriented fresh christmas transition.',
        },
];

export const HomeTop: React.FunctionComponent<HomeTopProps> = () => {
        const [newSlideData, refSlide, handleSetSlide, currentSlide] = useSlideShow<HTMLDivElement, SlideData>({ data: slideData });

        return (
                <HomeTopContainer>
                        <HomeTopTitle>
                                Make Your Awesome Quiz And Become <br /> Your Most Unstoppable Self
                        </HomeTopTitle>
                        {/*//*----------------Slide Show section start-------------------------- */}
                        <HomeSlideShowContainer>
                                <HomeSlideImage ref={refSlide}>
                                        {newSlideData.map((item) => {
                                                return (
                                                        <HomeSlideItem key={item._id}>
                                                                <Image
                                                                        src={item.imageUrl}
                                                                        alt={item.title}
                                                                        height="350"
                                                                        width="750"
                                                                        layout="responsive"
                                                                        objectFit="cover"
                                                                />
                                                        </HomeSlideItem>
                                                );
                                        })}
                                </HomeSlideImage>
                                <HomeSlideContent>
                                        <CirclePagination handleOnClick={handleSetSlide} currentSelect={currentSlide} data={slideData} />
                                        <HomeSlideTitle>{newSlideData[currentSlide].title}</HomeSlideTitle>
                                        <HomeSlideText>{newSlideData[currentSlide].content}</HomeSlideText>
                                        <HomeSlideLink>Learn More</HomeSlideLink>
                                </HomeSlideContent>
                        </HomeSlideShowContainer>
                        {/* //*----------------Counter section start-------------------------- */}
                        <HomeCounterContainer>
                                <HomeCounterTitle>
                                        MyQuiz Is A Great Platform To Build Your Awesome Quizzes
                                        <br />
                                        Explore Your Knowledge With Our Quizzes
                                </HomeCounterTitle>
                                <HomeCounterWrapper>
                                        <HomeCounterItem>
                                                <HomeCounterItemTitle>1K</HomeCounterItemTitle>
                                                <HomeCounterItemText>STUDENTS</HomeCounterItemText>
                                        </HomeCounterItem>
                                        <HomeCounterItem>
                                                <HomeCounterItemTitle>3K</HomeCounterItemTitle>
                                                <HomeCounterItemText>QUIZZES</HomeCounterItemText>
                                        </HomeCounterItem>
                                        <HomeCounterItem>
                                                <HomeCounterItemTitle>8K</HomeCounterItemTitle>
                                                <HomeCounterItemText>HOURS EXAM</HomeCounterItemText>
                                        </HomeCounterItem>
                                        <HomeCounterItem>
                                                <HomeCounterItemTitle>500</HomeCounterItemTitle>
                                                <HomeCounterItemText>TEACHERS</HomeCounterItemText>
                                        </HomeCounterItem>
                                </HomeCounterWrapper>
                        </HomeCounterContainer>
                </HomeTopContainer>
        );
};
