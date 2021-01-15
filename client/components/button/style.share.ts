import { css } from 'styled-components';

export const BtnCommonStyle = css(
        ({ theme }) => css`
                background-color: ${theme.colors.primary.one};
                border-radius: 3px;
                padding: ${theme.ruler}px ${theme.ruler * 2}px;
                color: ${theme.colors.font.white};
                display: inline-block;
                transition: 0.2s;
                position: relative;
                cursor: pointer;
                &.active {
                        color: ${theme.colors.primary.one};
                }

                &:not(.active):hover {
                        background-color: ${theme.colors.primary.five};
                }
        `,
);
