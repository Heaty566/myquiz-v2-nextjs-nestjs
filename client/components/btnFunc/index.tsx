import * as React from 'react';

//* Import
import { BtnFuncContainer } from './style';

export interface BtnFuncProps {
        label: string;
}

export const BtnFunc: React.FunctionComponent<BtnFuncProps> = ({ label }) => {
        return <BtnFuncContainer type="submit">{label}</BtnFuncContainer>;
};
