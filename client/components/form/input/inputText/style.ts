import styled, { css } from 'styled-components';

//* Import
import { InputCommonStyle, InputCommonContainer, InputCommonError, InputCommonLabel } from '../../../../style/components/input';

export const InputTextContainer = styled.div(
        () => css`
                ${InputCommonContainer}
        `,
);
export const InputTextLabel = styled.label(
        ({ theme: {} }) => css`
                ${InputCommonLabel}
        `,
);
export const InputTextError = styled.div(
        ({ theme: {} }) => css`
                ${InputCommonError}
        `,
);

export const InputTextField = styled.input(
        ({ theme: {} }) => css`
                ${InputCommonStyle}
        `,
);
