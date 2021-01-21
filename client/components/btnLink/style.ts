import styled, { css } from 'styled-components';

//* Import
import { BtnCommonStyle } from '../../style/components/button';

export const BtnLinkContainer = styled.a(
        ({ theme: {} }) => css`
                ${BtnCommonStyle}
        `,
);
