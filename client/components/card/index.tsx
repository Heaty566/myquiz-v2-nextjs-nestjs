import * as React from 'react';
import { QuizCardContainer, QuizStar } from './style';
import { Text } from '../../style/typography';
import { Layout } from '../../style/layout';
import { Box } from '../../style/common';

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
