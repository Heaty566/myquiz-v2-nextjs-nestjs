import * as React from 'react';

//* Import
import { BtnFuncContainer, BtnCircle } from './style';

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

export interface BtnFuncProps {
        label: string;
        isLoading: boolean;
}

export const BtnFunc: React.FunctionComponent<BtnFuncProps> = ({ label, isLoading }) => {
        return (
                <BtnFuncContainer type="submit" className={isLoading ? 'active' : ''} disabled={isLoading}>
                        {label}
                        {isLoading && <BtnLoading />}
                </BtnFuncContainer>
        );
};
