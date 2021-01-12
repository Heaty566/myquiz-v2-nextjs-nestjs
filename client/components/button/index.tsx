import React from 'react';
import Link from 'next/link';

//* Style import
import { BtnFuncContainer, BtnLinkContainer, BtnCircle } from './style';

//*------------------------------
import { useLoading } from '../../hooks/useLoading';

interface BtnCommonProps {
        label: string;
        isApiCall?: boolean;
}
export interface BtnFuncProps extends BtnCommonProps {}
export interface BtnLinkProps extends BtnCommonProps {
        link?: string;
}

const BtnLoading: React.FunctionComponent<{}> = () => {
        return (
                <BtnCircle>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                </BtnCircle>
        );
};

export const BtnFunc: React.FunctionComponent<BtnFuncProps> = ({ label = '', isApiCall = false }) => {
        const isLoading = useLoading();

        return (
                <BtnFuncContainer className={isLoading ? 'active' : ''}>
                        {label}
                        {isLoading && isApiCall && <BtnLoading />}
                </BtnFuncContainer>
        );
};

export const BtnLink: React.FunctionComponent<BtnLinkProps> = ({ label = '', link = '', isApiCall = false }) => {
        const isLoading = useLoading();

        return (
                <Link href={link}>
                        <BtnLinkContainer href={link}>
                                {label}
                                {isLoading && isApiCall && <BtnLoading />}
                        </BtnLinkContainer>
                </Link>
        );
};
