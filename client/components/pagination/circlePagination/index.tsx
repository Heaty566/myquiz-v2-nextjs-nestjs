import * as React from 'react';
import { CirclePaginationContainer, CirclePaginationItem } from './style';

interface ListItem {
        _id: string | number;
}

export interface CirclePaginationProps {
        handleOnClick: Function;
        data: ListItem[];
        currentSelect: number;
}

export const CirclePagination: React.FunctionComponent<CirclePaginationProps> = ({ handleOnClick, currentSelect, data = [] }) => {
        return (
                <CirclePaginationContainer>
                        {data.map((item, index) => (
                                <CirclePaginationItem
                                        className={currentSelect === index ? 'active' : ''}
                                        key={item._id}
                                        onClick={() => handleOnClick(index)}
                                />
                        ))}
                </CirclePaginationContainer>
        );
};
