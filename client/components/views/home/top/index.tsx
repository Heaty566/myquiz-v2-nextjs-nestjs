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
                title: 'Quit Studying and Take a Test',
                imageUrl: '/page/home/images/slide-2.png',
                content:
                        'Taking a test is not just a passive mechanism for assessing how much people know, according to new research. It actually helps people learn, and it works better than a number of other studying techniques.',
        },
        {
                _id: 1,
                title: 'Frequent Tests Can Enhance College Learning',
                imageUrl: '/page/home/images/slide-3.png',
                content:
                        'Just don’t hide in the back of the room and be invisible. Moreover, don’t hesitate to ask questions in class; if you’re wondering about something, chances are that someone else is too. If you think of a question outside of class time, visit the professor during office hours (that’s the purpose of office hours) or send an emai',
        },
        {
                _id: 2,
                title: 'Some Notes on Note-taking',
                imageUrl: '/page/home/images/slide-1.png',
                content:
                        'I went to college long before the era of laptops, so I learned to take notes the old-fashioned way: ink on paper. But that does not mean my note-taking system was simple. Indeed it was an intricate hieroglyphic language, in which asterisks and underscoring and check marks and exclamation points all had precise meaning, if only to me.',
        },
        {
                _id: 3,
                title: '21 Easy-to-Follow Tips',
                imageUrl: '/page/home/images/slide-4.png',
                content:
                        'It’s about that time again. Sleepy college towns will begin to awaken, abuzz with an excitement that only college students can inspire. Young scholars will soon arrive on college and university campuses, ready, or not so ready, to take on the world of higher education.   ',
        },
        {
                _id: 4,
                title: 'Practicing Useful Annotation Strategies',
                imageUrl: '/page/home/images/slide-5.png',
                content:
                        'When students have finished their responses, whip around the room to have share their thoughts. Ask: Are there any differences in how you write notes on, say, a novel or poem as opposed to a history textbook chapter? What are the uses of book annotations?',
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

export default HomeTop;
