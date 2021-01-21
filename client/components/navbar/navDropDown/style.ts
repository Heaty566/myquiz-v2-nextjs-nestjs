import styled, { css } from 'styled-components';

//* Import
import { breakPoint } from '../../../style';

export const NavDropDownContainer = styled.nav(
        ({ theme: { ruler, colors } }) => css`
                position: absolute;
                top: 100%;
                right: ${ruler * 8}px;
                z-index: 999;
                width: 300px;
                background-color: ${colors.white.one};
                padding: ${ruler * 2}px 0;
                border: 1px solid ${colors.dark.one};
                list-style: none;
                transform: scaleY(0);
                transition: 0.2s;
                transform-origin: top;
                &.active {
                        transform: scaleY(1);
                }
                @media ${breakPoint.md} {
                        right: ${ruler * 2}px;
                }
                @media ${breakPoint.sm} {
                        width: 100%;
                        right: 0;
                }
        `,
);

export const NavDropDownList = styled.ul(
        ({ theme: { ruler } }) => css`
                /* margin-bottom: ${ruler * 3}px; */
        `,
);
export const NavDropDownItem = styled.li(
        ({ theme: { ruler } }) => css`
                /* margin-bottom: ${ruler * 3}px; */
        `,
);
export const NavDropDownIcon = styled.div(
        ({ theme: { ruler } }) => css`
                display: inline-block;
                margin-right: ${ruler}px;
        `,
);
export const NavDropDownLink = styled.a(
        ({ theme: { fontSize, colors, ruler } }) => css`
                display: flex;
                align-items: center;
                color: ${colors.font.black};
                padding: ${ruler}px ${ruler * 2}px;
                font-size: ${fontSize[16]}px;
                font-weight: bold;
                transition: 0.2s;
                width: 100%;
                cursor: pointer;
                &:hover {
                        background-color: ${colors.white.two};
                        color: ${colors.primary.one};
                }
        `,
);
