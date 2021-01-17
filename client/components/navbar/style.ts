import styled, { css } from 'styled-components';

//* Import
import { breakPoint } from '../../style';

export const NavbarContainer = styled.header(
        ({ theme: { ruler, boxShadow, colors } }) => css`
                position: fixed;
                width: 100%;
                height: 64px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 ${8 * ruler}px;
                z-index: 999;
                background-color: ${colors.white.one};
                box-shadow: ${boxShadow.one};

                @media ${breakPoint.md} {
                        padding: 0 ${2 * ruler}px;
                }
        `,
);

export const NavBrand = styled.a(
        () => css`
                flex-shrink: 0;
                display: inline-block;
        `,
);
