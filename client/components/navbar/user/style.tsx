import styled, { css } from 'styled-components';

//* Import
import { Layout } from '../../../style/layout';

export const NavbarUserContainer = styled(Layout)(() => css``);

export const NavbarUserBtn = styled.button(
        ({ theme: { ruler } }) => css`
                height: 28px;
                margin-right: ${ruler}px !important;
                cursor: pointer;
        `,
);
