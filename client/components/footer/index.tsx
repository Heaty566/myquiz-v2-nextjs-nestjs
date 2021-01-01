import React from 'react';

//* Import style
import { Text } from '../../style/typography';
import { FooterContainer, FooterContainerTop, FooterAuthor, FooterCol, FooterColContainer } from './style';

//* Import Component
import { LangSelect } from '../common/langSelect';

export interface FooterProps {}

const listContent = [
        [
                {
                        text: 'MyQuiz for Business',
                },
                {
                        text: 'Teacher on MyQuiz',
                },
                {
                        text: 'About us',
                },
                {
                        text: 'Contact us',
                },
        ],
        [
                {
                        text: 'Careers',
                },
                {
                        text: 'Privacy policy and cookie policy',
                },
                {
                        text: 'Blog',
                },
                {
                        text: 'Help and Support',
                },
                {
                        text: 'Terms',
                },
        ],
];

const Footer: React.FunctionComponent<FooterProps> = () => {
        return (
                <FooterContainer>
                        <FooterContainerTop $alignItems="flex-start" $justifyContent="space-between">
                                <FooterColContainer $gutter={4}>
                                        {listContent.map((col, index) => {
                                                return (
                                                        <FooterCol key={index}>
                                                                {col.map((item, indexTwo) => (
                                                                        <li key={indexTwo}>
                                                                                <Text $type="p3" as="a" $color="white">
                                                                                        {item.text}
                                                                                </Text>
                                                                        </li>
                                                                ))}
                                                        </FooterCol>
                                                );
                                        })}
                                </FooterColContainer>
                                <LangSelect />
                        </FooterContainerTop>
                        <FooterAuthor>
                                DEVELOPED BY HEATY566
                                <br />
                                Copyright © 2020 Haley Pham
                        </FooterAuthor>
                </FooterContainer>
        );
};

export default Footer;
