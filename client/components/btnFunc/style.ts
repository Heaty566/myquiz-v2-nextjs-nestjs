import styled, { css } from 'styled-components';

//* Import
import { BtnCommonStyle } from '../../style/components/button';

export const BtnFuncContainer = styled.button(
        ({ theme: {} }) => css`
                ${BtnCommonStyle}
        `,
);
