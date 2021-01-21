import styled, { css } from 'styled-components';

//* Import
import { InputCommonStyle, InputCommonContainer, InputCommonError, InputCommonLabel } from '../../../../style/components/input';

export const InputPasswordContainer = styled.div(
        () => css`
                ${InputCommonContainer}
        `,
);
export const InputPasswordLabel = styled.label(
        ({ theme: {} }) => css`
                ${InputCommonLabel}
        `,
);
export const InputPasswordFieldWrapper = styled.div(
        ({ theme: { colors, ruler } }) => css`
                ${InputCommonStyle}

                align-items: center;
                position: relative;
                & > div {
                        position: absolute !important;
                        right: ${ruler}px;
                        top: 50%;
                        transform: translateY(-50%);
                }
                &:focus-within {
                        box-shadow: 0 0 0 1px ${colors.primary.one};
                }

                & > *:last-child {
                        cursor: pointer;
                }
        `,
);
export const InputPasswordField = styled.input<{ $isShow: boolean }>(
        ({ theme: { ruler }, $isShow }) => css`
                width: 100%;
                display: block;
                text-indent: ${ruler * 2}px;
                height: 100%;
                height: 35px;
                font-size: ${$isShow ? '16px' : '20px'};
                padding-right: ${ruler * 4}px;
        `,
);
export const InputPasswordError = styled.div(
        ({ theme: {} }) => css`
                ${InputCommonError}
        `,
);
