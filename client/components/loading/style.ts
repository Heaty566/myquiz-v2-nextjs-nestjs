import styled, { css } from 'styled-components';

export const LoadingContainer = styled.div<{ $size?: number; $marginTop?: number }>(
        ({ $size = 4, $marginTop = 0, theme: { ruler } }) => css`
                margin: ${$marginTop * 8}px auto auto auto;
                width: ${$size * ruler}px;
                height: ${$size * ruler}px;
                padding: ${ruler}px;
        `,
);

export const Circle = styled.div<{ $size?: number }>(
        ({ theme: { colors, ruler, animation }, $size = 4 }) => css`
                display: inline-block;
                width: inherit;
                height: inherit;
                position: relative;
                & div {
                        border-radius: 50%;
                        position: absolute;
                        width: ${$size * ruler}px;
                        height: ${$size * ruler}px;
                        border: ${$size * ruler * 0.125}px solid ${colors.primary.one};
                        animation: ${animation.rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
                        border-color: ${colors.primary.one} transparent transparent transparent;
                }

                & div:nth-child(1) {
                        animation-delay: -0.45s;
                }
                & div:nth-child(2) {
                        animation-delay: -0.3s;
                }
                & div:nth-child(3) {
                        animation-delay: -0.15s;
                }
        `,
);
