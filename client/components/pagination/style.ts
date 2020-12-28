import styled, { css } from 'styled-components';

export const PaginationButton = styled.a(
        ({ theme: { colors } }) => css`
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: ${colors.secondary.four};
                cursor: pointer;
                transition: 0.2;

                &.active {
                        background-color: ${colors.primary.one};
                }
        `,
);
export const PaginationContainer = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
`;
