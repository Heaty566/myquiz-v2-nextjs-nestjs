import styled, { css } from 'styled-components';

export const TextFieldContainer = styled.div(
        ({ theme: { ruler } }) => css`
                & > *:first-child {
                        margin-bottom: ${ruler}px;
                }
        `,
);

export const TextFieldLabel = styled.label(
        ({ theme: { fontSize } }) => css`
                display: block;
                font-size: ${fontSize.h4};
                font-weight: bold;
        `,
);

export const FieldInput = styled.input(
        ({ theme: { fontSize } }) => css`
                display: block;
                width: 100%;
                min-height: 32px;
                font-size: ${fontSize.p2}px;

                &:-webkit-autofill,
                &:-webkit-autofill:hover,
                &:-webkit-autofill:focus,
                &:-webkit-autofill:active {
                        -webkit-box-shadow: 0 0 0 30px #fefefe inset !important;
                }
        `,
);

export const TextFieldErrorMsg = styled.span(
        ({ theme: { colors, fontSize, animation, ruler } }) => css`
                margin-top: ${ruler * 0.5}px;
                animation: 1s ${animation.fadeIn};
                font-size: ${fontSize.p3}px;
                display: block;
                font-weight: bold;
                color: ${colors.red.one};
        `,
);

export const TextFieldSuccessMsg = styled.span(
        ({ theme: { colors, fontSize, animation, ruler } }) => css`
                margin-top: ${ruler * 0.5}px;
                animation: 1s ${animation.fadeIn};
                font-size: ${fontSize.h4}px;
                display: block;
                font-weight: bold;
                color: ${colors.green.one};
        `,
);

export const TextInputCommon = css(
        ({ theme: { ruler, colors } }) => css`
                box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
                padding: 0 ${ruler * 2}px;
                border: 1px solid ${colors.primary.three};
                transition: 0.2s;
                border-radius: 3px;
                &:focus-within {
                        box-shadow: 0 0 0 1px ${colors.primary.one};
                }

                &.active {
                        border: 1px solid ${colors.red.one};
                        box-shadow: 0 0 0 1px ${colors.red.one};
                }
        `,
);
