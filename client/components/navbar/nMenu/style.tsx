import styled, { css } from 'styled-components';
import { breakPoint } from '../../../style';
import { Layout } from '../../../style/layout';

export const NavbarMainContainer = styled(Layout)(
        () => css`
                top: 100%;
                position: absolute;
                height: 100px;
                border: 1px solid red;
                right: 64px;
        `,
);
