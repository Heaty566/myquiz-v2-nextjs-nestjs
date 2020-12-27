import styled, { css } from "styled-components";

//*todo add animation for button

const ButtonStyled = css(
        ({ theme }) => css`
                background-color: ${theme.colors.primary.one};
                border-radius: 3px;
                padding: ${theme.ruler}px ${theme.ruler * 2}px;
                color: ${theme.colors.font.white};
                display: inline-block;
                transition: 0.2s;

                &:hover {
                        background-color: ${theme.colors.primary.five};
                }
        `
);

export const ButtonCommonContainer = styled.button`
        ${ButtonStyled}
`;
export const ButtonLinkContainer = styled.a`
        ${ButtonStyled}
`;
