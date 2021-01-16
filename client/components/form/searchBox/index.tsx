import React from 'react';
import Image from 'next/image';

//* Import
import { SearchBoxContainer, SearchBoxBtn, SearchBoxTextField } from './style';

export interface FormSearchBoxProps {
        placeholder: string;
}

export const FormSearchBox: React.FunctionComponent<FormSearchBoxProps> = ({ placeholder = '' }) => {
        return (
                <SearchBoxContainer>
                        <SearchBoxTextField type="text" placeholder={placeholder} />
                        <SearchBoxBtn>
                                <Image src="/asset/icon/search-glass.svg" alt="" height="16" width="16" />
                        </SearchBoxBtn>
                </SearchBoxContainer>
        );
};
