import * as React from 'react';
//* Style import
import { PaginationContainer, PaginationButton } from './style';

export interface PaginatorProps {}

export const Pagination: React.FunctionComponent<PaginatorProps> = () => {
        return (
                <PaginationContainer>
                        <PaginationButton className="active" />
                        <PaginationButton />
                </PaginationContainer>
        );
};
