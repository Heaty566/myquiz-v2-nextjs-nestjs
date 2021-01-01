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

export const TextFieldWrapper = styled.div(
        ({ theme: { ruler, colors } }) => css`
                box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25);
                padding: ${ruler}px ${ruler * 2}px;
                border: 1px solid ${colors.primary.three};
                border-radius: 3px;
        `,
);

export const TextFieldInput = styled.input(
        ({ theme: { fontSize } }) => css`
                display: block;
                width: 100%;
                font-size: ${fontSize.p2}px;

                &:-webkit-autofill,
                &:-webkit-autofill:hover,
                &:-webkit-autofill:focus,
                &:-webkit-autofill:active {
                        -webkit-box-shadow: 0 0 0 30px #fefefe inset !important;
                }
        `,
);

export const TextFieldPasswordInput = styled(TextFieldWrapper)(
        ({ theme: { ruler } }) => css`
                display: flex;

                & ${TextFieldInput} {
                        margin-right: ${ruler * 0.5}px;
                }

                & img {
                        cursor: pointer;
                }
        `,
);

export const TextFieldError = styled.span(
        ({ theme: { colors, fontSize, animation, ruler } }) => css`
                margin-top: ${ruler * 0.5}px;
                animation: 1s ${animation.fadeIn};
                font-size: ${fontSize.p3}px;
                display: block;
                font-weight: bold;
                color: ${colors.red.one};
        `,
);
