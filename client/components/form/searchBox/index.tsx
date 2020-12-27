import * as React from "react";
import { SearchBoxContainer, SearchBoxIcon, SearchBoxTextField } from "./style";
import { ImageFull } from "../../../style/common";
export interface SearchBoxProps {
        placeholder: string;
}

export const SearchBox: React.FunctionComponent<SearchBoxProps> = ({ placeholder }) => {
        return (
                <SearchBoxContainer>
                        <SearchBoxTextField type="text" placeholder={placeholder} />
                        <SearchBoxIcon>
                                <ImageFull src="/icon/search-glass.svg" alt="" />
                        </SearchBoxIcon>
                </SearchBoxContainer>
        );
};
