import React from 'react';
import Link from 'next/link';

//* Style import
import { BtnFuncContainer, BtnLinkContainer } from './style';

interface BtnCommonProps {
        label: string;
}
export interface BtnFuncProps extends BtnCommonProps {}
export interface BtnLinkProps extends BtnCommonProps {
        link?: string;
}

const BtnFunc: React.FunctionComponent<BtnFuncProps> = ({ label = '' }) => <BtnFuncContainer>{label}</BtnFuncContainer>;

const BtnLink: React.FunctionComponent<BtnLinkProps> = ({ label = '', link = '' }) => {
        return (
                <Link href={link}>
                        <BtnLinkContainer>{label}</BtnLinkContainer>
                </Link>
        );
};

export { BtnFunc, BtnLink };
