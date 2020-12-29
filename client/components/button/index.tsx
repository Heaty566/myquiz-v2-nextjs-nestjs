import React from 'react';

//* Style import
import { BtnFuncContainer, BtnLinkContainer } from './style';

interface BtnCommonProps {
        label: string;
}
export interface BtnFuncProps extends BtnCommonProps {}
export interface BtnLinkProps extends BtnCommonProps {
        link: string;
}

const BtnFunc: React.FunctionComponent<BtnFuncProps> = ({ label = '' }) => <BtnFuncContainer>{label}</BtnFuncContainer>;

const BtnLink: React.FunctionComponent<BtnLinkProps> = ({ label = '', link = '#' }) => {
        return <BtnLinkContainer href={link}>{label}</BtnLinkContainer>;
};

export { BtnFunc, BtnLink };
