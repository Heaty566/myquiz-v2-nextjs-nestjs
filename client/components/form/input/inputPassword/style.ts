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
                padding-right:  ${ruler * 2}px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                &:focus-within {
                        box-shadow: 0 0 0 1px ${colors.primary.one};
                }

                & > *:last-child {
                        cursor: pointer;
                }
        `,
);
export const InputPasswordField = styled.input(
        ({ theme: { ruler } }) => css`
                width: 100%;

                height: 100%;
                padding: 0 ${ruler}px 0 ${ruler * 2}px;
        `,
);
export const InputPasswordError = styled.div(
        ({ theme: {} }) => css`
                ${InputCommonError}
        `,
);
