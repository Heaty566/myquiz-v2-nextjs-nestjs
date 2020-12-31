import * as React from 'react';
import { Circle, LoadingContainer } from './style';

export interface CircleLoadingProps {
        size?: number;
        marginTop?: number;
}

export const CircleLoading: React.FunctionComponent<CircleLoadingProps> = ({ size = 4, marginTop = 0 }) => {
        return (
                <LoadingContainer $size={size} $marginTop={marginTop}>
                        <Circle $size={size}>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                        </Circle>
                </LoadingContainer>
        );
};

export default CircleLoading;
