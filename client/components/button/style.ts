import styled, { css } from 'styled-components';

const BtnCommonStyle = css(
        ({ theme }) => css`
                background-color: ${theme.colors.primary.one};
                border-radius: 3px;
                padding: ${theme.ruler}px ${theme.ruler * 2}px;
                color: ${theme.colors.font.white};
                display: inline-block;
                transition: 0.2s;
                cursor: pointer;

                &:hover {
                        background-color: ${theme.colors.primary.five};
                }
        `,
);

export const BtnFuncContainer = styled.button`
        ${BtnCommonStyle}
`;
export const BtnLinkContainer = styled.a`
        ${BtnCommonStyle}
`;
