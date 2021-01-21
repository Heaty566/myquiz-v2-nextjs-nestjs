import { css } from 'styled-components';

export const InputCommonStyle = css(
        ({ theme: { colors, ruler, fontSize, borderRadius } }) => css`
                border: 1px solid ${colors.primary.three};
                display: block;
                width: inherit;
                border-radius: ${borderRadius.sm}px;
                font-size: ${fontSize[16]}px;
                margin: ${ruler}px 0 ${ruler * 0.5}px 0;
                height: 35px;
                text-indent: ${ruler * 2}px;
                transition: 0.2s;
                line-height: 35px;
                background-color: ${colors.white.one};

                &:focus {
                        box-shadow: 0 0 0 1px ${colors.primary.one};
                }
        `,
);

export const InputCommonContainer = css(
        () => css`
                width: 100%;
        `,
);
export const InputCommonLabel = css(
        ({ theme: {} }) => css`
                font-weight: bold;
        `,
);
export const InputCommonError = css(
        ({ theme: { colors, fontSize } }) => css`
                font-weight: bold;
                font-size: ${fontSize[14]}px;
                color: ${colors.red.one};
        `,
);
