import * as React from 'react';
import Image from 'next/image';
import { UserPlanCardContainer, UserPlanCheckCol } from '../style';
import { Text } from '../../../style/typography';
import { Layout } from '../../../style/layout';
import { BtnLink } from '../../button';

export interface CardUserPlanProps {
        title: string;
        price: number;
        btnText: string;
        link: string;
        listFeatures: string[];
        color: 'one' | 'two';
        featureLabel: string;
}

export const CardUserPlan: React.FunctionComponent<CardUserPlanProps> = ({ btnText, listFeatures = [], price, title, color, featureLabel, link }) => {
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
                                <BtnLink link={link} label={btnText} />
                        </Layout>

                        <Text $type="h4" as="h4">
                                {featureLabel}
                        </Text>

                        {listFeatures.map((item) => {
                                return (
                                        <UserPlanCheckCol key={item}>
                                                <Image src="/asset/icon/check.svg" alt="" height="18px" width="25px" />
                                                <Text $type="h4" as="h4" key={item}>
                                                        {item}
                                                </Text>
                                        </UserPlanCheckCol>
                                );
                        })}
                </UserPlanCardContainer>
        );
};
