import styled, { css } from 'styled-components';

//* Import

export const SearchBoxContainer = styled.div(
        ({ theme: { colors, borderRadius } }) => css`
                display: flex;
                justify-content: space-between;
                background-color: ${colors.primary.two};
                height: 35px;
                min-width: 255px;
                border-radius: ${borderRadius.sm}px;
                overflow: hidden;
                transition: 0.2s;
                &:focus-within {
                        box-shadow: 0 0 0 2px ${colors.primary.one};
                }
        `,
);

export const SearchBoxInput = styled.input(
        ({ theme: { ruler, colors, fontSize } }) => css`
                flex: 1;

                padding: 0 ${ruler}px;
                color: ${colors.font.white};
                font-size: ${fontSize[16]}px;
                &::placeholder {
                        color: ${colors.font.white};
                        opacity: 0.8;
                }
                &:focus::placeholder {
                        opacity: 1;
                }
        `,
);

export const SearchBoxBtn = styled.button(
        ({ theme: { colors } }) => css`
                height: 100%;
                cursor: pointer;
                padding: 10px 12px;
                background-color: ${colors.primary.one};
        `,
);
