import styled, { css } from "styled-components";
import { variable } from "../../styled";

//*todo add animation for button

const ButtonStyled = css`
        background-color: ${variable.colors.primary.one};
        border-radius: 3px;
        padding: ${variable.ruler}px ${variable.ruler * 2}px;
        color: ${variable.colors.font.white};
        display: inline-block;
        transition: 0.2s;

        &:hover {
                background-color: #234dd3;
        }
`;

export const ButtonCommonContainer = styled.button`
        ${ButtonStyled}
`;
export const ButtonLinkContainer = styled.a`
        ${ButtonStyled}
`;
