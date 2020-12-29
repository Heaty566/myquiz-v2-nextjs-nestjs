import React from 'react';

//* Style import
import { SearchBoxContainer, SearchBoxBtn, SearchBoxTextField } from './style';
import { ImageFull } from '../../../style/common';

export interface FormSearchBoxProps {
        placeholder: string;
}

export const FormSearchBox: React.FunctionComponent<FormSearchBoxProps> = ({ placeholder = '' }) => {
        return (
                <SearchBoxContainer>
                        <SearchBoxTextField type="text" placeholder={placeholder} />
                        <SearchBoxBtn>
                                <ImageFull src="/asset/icon/search-glass.svg" alt="" />
                        </SearchBoxBtn>
                </SearchBoxContainer>
        );
};
