import React from 'react';
import Link from 'next/link';

//* Import
import { FooterContainer, FooterContainerTop, FooterAuthor, FooterList, FooterListContainer, FooterItem, FooterLink } from './style';
export interface FooterProps {}

const listContent = [
        [
                {
                        text: 'MyQuiz For Business',
                },
                {
                        text: 'Teacher On MyQuiz',
                },
                {
                        text: 'About Us',
                },
                {
                        text: 'Contact Us',
                },
        ],
        [
                {
                        text: 'Careers',
                },
                {
                        text: 'Privacy Policy And Cookie Policy',
                },
                {
                        text: 'Blog',
                },
                {
                        text: 'Help And Support',
                },
                {
                        text: 'Terms',
                },
        ],
];

const Footer: React.FunctionComponent<FooterProps> = () => {
        return (
                <FooterContainer>
                        <FooterContainerTop>
                                <FooterListContainer>
                                        {listContent.map((col, index) => {
                                                return (
                                                        <FooterList key={index}>
                                                                {col.map((item) => (
                                                                        <FooterItem key={item.text}>
                                                                                <Link href="/">
                                                                                        <FooterLink href="/">{item.text}</FooterLink>
                                                                                </Link>
                                                                        </FooterItem>
                                                                ))}
                                                        </FooterList>
                                                );
                                        })}
                                </FooterListContainer>
                        </FooterContainerTop>
                        <FooterAuthor href="https://www.heaty566.com/" target="_blank">
                                DEVELOPED BY HEATY566
                                <br />
                                Copyright © 2020 Haley Pham
                        </FooterAuthor>
                </FooterContainer>
        );
};

export default Footer;
