import { css } from 'styled-components';

export const BtnCommonStyle = css(
        ({ theme: { ruler, fontSize, colors, borderRadius } }) => css`
                height: 35px;
                padding: ${ruler}px ${ruler * 2}px;
                border-radius: ${borderRadius.sm}px;
                font-size: ${fontSize[16]}px;
                font-weight: 500;
                text-transform: capitalize;
                color: ${colors.font.white};
                background-color: ${colors.primary.one};
                transition: 0.2s;
                cursor: pointer;

                font-family: 'Roboto', sans-serif;
                &:hover {
                        background-color: ${colors.primary.five};
                }
        `,
);
