import * as React from 'react';
import { PaginationContainer, CirclePaginationBtn } from './style';

export interface PaginatorProps {}

export const CirclePagination: React.FunctionComponent<PaginatorProps> = () => {
        return (
                <PaginationContainer $alignItems="center" $justifyContent="space-between">
                        <CirclePaginationBtn className="active" />
                        <CirclePaginationBtn />
                        <CirclePaginationBtn />
                        <CirclePaginationBtn />
                        <CirclePaginationBtn />
                </PaginationContainer>
        );
};
