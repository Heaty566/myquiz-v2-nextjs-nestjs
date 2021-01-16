import * as React from 'react';

//* Import
import { IBottomContainer, QuizCardWrapper, UserPlanCardContainer, QuizCardContainer } from './style';
import { QuizCard, CardUserPlan } from '../../../card';
import { Text } from '../../../../style/typography';
import { Layout } from '../../../../style/layout';

export interface HomeBottomProps {}

const HomeBottom: React.FunctionComponent<HomeBottomProps> = () => {
        return (
                <IBottomContainer>
                        <QuizCardContainer>
                                <QuizCardWrapper>
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
                                </QuizCardWrapper>
                        </QuizCardContainer>
                        <UserPlanCardContainer $justifyContent="center" $gutter={8}>
                                <CardUserPlan
                                        featureLabel="Features include:"
                                        btnText="Build You Quiz Now"
                                        link="/"
                                        listFeatures={['Offline access', 'Unlimited create quizzes', 'Unlimited take exams', '24/7 Support']}
                                        price={0}
                                        title="Free"
                                        color="two"
                                />
                                <CardUserPlan
                                        featureLabel="Everything in Free, plus:"
                                        btnText="Get started"
                                        link="/"
                                        listFeatures={[
                                                'Create real time exam',
                                                'Student reports',
                                                'Live Stream Video',
                                                'Create Class, and course',
                                                'Rich text formatting',
                                        ]}
                                        color="one"
                                        price={10}
                                        title="Membership"
                                />
                        </UserPlanCardContainer>
                </IBottomContainer>
        );
};

export default HomeBottom;
