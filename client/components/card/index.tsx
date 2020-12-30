import * as React from 'react';
import { QuizCardContainer, QuizStar, UserPlanCardContainer, UserPlanCheckCol } from './style';
import { Text } from '../../style/typography';
import { Layout } from '../../style/layout';
import { Box } from '../../style/common';
import { BtnLink } from '../button';

export interface QuizCardProps {
        title: string;
        totalQuestion: number;
        stars: number;
        owner: string;
}

export const QuizCard: React.FunctionComponent<QuizCardProps> = ({ owner, stars, title, totalQuestion }) => {
        return (
                <QuizCardContainer>
                        <Box>
                                <Text $type="h4" as="h1">
                                        {title}
                                </Text>
                                <Text $type="p2" as="span">
                                        {owner}
                                </Text>
                        </Box>

                        <Layout $justifyContent="space-between">
                                <Text $type="h4" as="p">{`${totalQuestion} Questions`}</Text>
                                <QuizStar $justifyContent="space-between" $alignItems="center">
                                        <img src="/asset/icon/start.svg" alt="" />
                                        <Text $type="h4" as="p">
                                                {stars}
                                        </Text>
                                </QuizStar>
                        </Layout>
                </QuizCardContainer>
        );
};

export interface UserPlanCardProps {
        title: string;
        price: number;
        btnText: string;
        link: string;
        listFeatures: string[];
        color: 'one' | 'two';
        featureLabel: string;
}

export const UserPlanCard: React.FunctionComponent<UserPlanCardProps> = ({ btnText, listFeatures = [], price, title, color, featureLabel }) => {
        return (
                <UserPlanCardContainer $color={color}>
                        <Text $type="h1" as="h1" $textAlign="center">
                                {title}
                        </Text>

                        <Text $type="h1" as="h1" $textAlign="center">
                                $ {price}
                                <Text $type="p1" as="span">
                                        / Month
                                </Text>
                        </Text>
                        <Layout $justifyContent="center">
                                <BtnLink link="/" label={btnText} />
                        </Layout>

                        <Text $type="h4" as="h4">
                                {featureLabel}
                        </Text>

                        {listFeatures.map((item) => {
                                return (
                                        <UserPlanCheckCol key={item}>
                                                <img src="/asset/icon/check.svg" alt="" />
                                                <Text $type="h4" as="h4" key={item}>
                                                        {item}
                                                </Text>
                                        </UserPlanCheckCol>
                                );
                        })}
                </UserPlanCardContainer>
        );
};
