import * as React from 'react';
import Link from 'next/link';

//* Import
import { BtnLinkContainer } from './style';

export interface BtnLinkProps {
        label: string;
        url: string;
}

export const BtnLink: React.FunctionComponent<BtnLinkProps> = ({ label = '', url = '/' }) => {
        return (
                <Link href={url}>
                        <BtnLinkContainer href={url}>{label}</BtnLinkContainer>
                </Link>
        );
};
