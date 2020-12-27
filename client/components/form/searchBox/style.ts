import styled, { css } from "styled-components";

export const SearchBoxContainer = styled.div(
        ({ theme }) => css`
                background-color: ${theme.colors.primary.two};
                border-radius: 3px;
                min-width: 200px;
                height: 32px;
                display: grid;
                grid-template-columns: 1fr 32px;
                overflow: hidden;
                transition: 0.2s ease-in-out;
                &:focus-within {
                        box-shadow: 0 0 0 2px ${theme.colors.primary.one};
                }
        `
);

export const SearchBoxTextField = styled.input(
        ({ theme }) => css`
                height: inherit;
                text-indent: ${theme.ruler}px;
                padding-right: ${theme.ruler}px;
                font-size: 16px;
                color: ${theme.colors.font.white};

                &::placeholder {
                        color: ${theme.colors.font.white};
                        opacity: 0.6;
                }
        `
);

export const SearchBoxIcon = styled.button(
        ({ theme }) => css`
                cursor: pointer;
                background-color: ${theme.colors.primary.one};
                padding: ${theme.ruler}px;
                height: inherit;
        `
);
