import * as React from 'react';

//* Import
import { PaginationContainer, CirclePaginationBtn } from './style';

export interface PaginatorProps {
        current: number;
        length: number;
        setCurrent: Function;
}

export const CirclePagination: React.FunctionComponent<PaginatorProps> = ({ current, length, setCurrent }) => {
        return (
                <PaginationContainer $alignItems="center" $justifyContent="space-between">
                        {Array(length)
                                .fill(0)
                                .map((_, index) => {
                                        return (
                                                <CirclePaginationBtn
                                                        key={index}
                                                        className={`${current === index ? 'active' : ''}`}
                                                        onClick={() => setCurrent(index)}
                                                />
                                        );
                                })}
                </PaginationContainer>
        );
};
