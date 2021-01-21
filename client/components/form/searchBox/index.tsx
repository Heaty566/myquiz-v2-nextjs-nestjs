import * as React from 'react';
import Image from 'next/image';

//* Import
import { SearchBoxContainer, SearchBoxBtn, SearchBoxInput } from './style';
export interface SearchBoxProps {}

export const SearchBox: React.FunctionComponent<SearchBoxProps> = () => {
        return (
                <SearchBoxContainer>
                        <SearchBoxInput placeholder="Search..." />
                        <SearchBoxBtn>
                                <Image height="15" width="14" src="/asset/icons/search-glass.svg" alt="search button" />
                        </SearchBoxBtn>
                </SearchBoxContainer>
        );
};
