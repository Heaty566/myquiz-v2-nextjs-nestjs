import React from 'react';
import Link from 'next/link';

//* Import
import { BtnLinkContainer } from './style';

export interface BtnLinkProps {
        link?: string;
        label: string;
}

export const BtnLink: React.FunctionComponent<BtnLinkProps> = ({ label = '', link = '' }) => {
        return (
                <Link href={link}>
                        <BtnLinkContainer href={link}>{label}</BtnLinkContainer>
                </Link>
        );
};
