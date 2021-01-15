import React from 'react';
import { BtnCircle, BtnFuncContainer } from './style';

export interface BtnFuncProps {
        label: string;
        isLoading: boolean;
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

export const BtnFunc: React.FunctionComponent<BtnFuncProps> = ({ label = '', isLoading = false }) => {
        return (
                <BtnFuncContainer className={isLoading ? 'active' : ''}>
                        {label}
                        {isLoading && <BtnLoading />}
                </BtnFuncContainer>
        );
};
