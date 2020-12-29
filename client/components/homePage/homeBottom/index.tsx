import * as React from 'react';
import { HomeBottomContainer, QuizCardContainer } from './style';
import { Text } from '../../../style/typography';
import { Layout } from '../../../style/layout';
import { QuizCard } from '../../card';

export interface HomeBottomProps {}

const HomeBottom: React.FunctionComponent<HomeBottomProps> = () => {
        return (
                <HomeBottomContainer>
                        <QuizCardContainer>
                                <Text $type="h3" as="h3">
                                        Trending on MyQuiz
                                </Text>

                                <Layout $justifyContent="center" $gutter={2}>
                                        <QuizCard
                                                owner="Floyd Miles"
                                                stars={433}
                                                title="Chap 1: Introduction to group communication"
                                                totalQuestion={13}
                                        />
                                        <QuizCard
                                                owner="Floyd Miles"
                                                stars={433}
                                                title="Chap 1: Introduction to group communication"
                                                totalQuestion={13}
                                        />
                                        <QuizCard
                                                owner="Floyd Miles"
                                                stars={433}
                                                title="Chap 1: Introduction to group communication"
                                                totalQuestion={13}
                                        />
                                </Layout>
                                <Layout $justifyContent="center" $gutter={2}>
                                        <QuizCard
                                                owner="Floyd Miles"
                                                stars={433}
                                                title="Chap 1: Introduction to group communication"
                                                totalQuestion={13}
                                        />
                                        <QuizCard
                                                owner="Floyd Miles"
                                                stars={433}
                                                title="Chap 1: Introduction to group communication"
                                                totalQuestion={13}
                                        />
                                        <QuizCard
                                                owner="Floyd Miles"
                                                stars={433}
                                                title="Chap 1: Introduction to group communication"
                                                totalQuestion={13}
                                        />
                                </Layout>
                                <Layout $justifyContent="center" $gutter={2}>
                                        <QuizCard
                                                owner="Floyd Miles"
                                                stars={433}
                                                title="Chap 1: Introduction to group communication"
                                                totalQuestion={13}
                                        />
                                        <QuizCard
                                                owner="Floyd Miles"
                                                stars={433}
                                                title="Chap 1: Introduction to group communication"
                                                totalQuestion={13}
                                        />
                                        <QuizCard
                                                owner="Floyd Miles"
                                                stars={433}
                                                title="Chap 1: Introduction to group communication"
                                                totalQuestion={13}
                                        />
                                </Layout>
                        </QuizCardContainer>
                </HomeBottomContainer>
        );
};

export default HomeBottom;
