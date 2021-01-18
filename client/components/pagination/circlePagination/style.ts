import styled, { css } from 'styled-components';

export const CirclePaginationContainer = styled.div(
        () => css`
                display: flex;
                max-width: 112px;
                justify-content: space-between;
                align-items: center;
        `,
);
export const CirclePaginationItem = styled.div(
        ({ theme: { colors } }) => css`
                height: 12px;
                width: 12px;
                border-radius: 50%;
                background-color: ${colors.white.one};
                cursor: pointer;
                transition: 0.4s;

                &.active {
                        background-color: ${colors.primary.three};
                }
        `,
);
