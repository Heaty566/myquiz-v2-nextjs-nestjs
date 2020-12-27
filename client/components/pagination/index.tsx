import * as React from "react";
import { PaginationContainer, PaginationButton } from "./style";
export interface PaginatorProps {}

const Pagination: React.FunctionComponent<PaginatorProps> = () => {
        return (
                <PaginationContainer>
                        <PaginationButton className="active"></PaginationButton>
                        <PaginationButton></PaginationButton>
                        <PaginationButton></PaginationButton>
                        <PaginationButton></PaginationButton>
                        <PaginationButton></PaginationButton>
                </PaginationContainer>
        );
};

export default Pagination;
