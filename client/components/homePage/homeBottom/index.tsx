import * as React from 'react';
import { HomeBottomContainer, QuizCardContainer, UserPlanCardContainer } from './style';
import { Text } from '../../../style/typography';
import { Layout } from '../../../style/layout';
import { QuizCard, UserPlanCard } from '../../card';

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
                        <UserPlanCardContainer>
                                <UserPlanCard
                                        btnText="Build You Quiz Now"
                                        link="/"
                                        listFeature={['Offline access', 'Unlimited create quizzes', 'Unlimited take exams', '24/7 Support']}
                                        price={0}
                                        title="Free"
                                />
                        </UserPlanCardContainer>
                </HomeBottomContainer>
        );
};

export default HomeBottom;
