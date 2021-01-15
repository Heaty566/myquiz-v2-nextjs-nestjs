import styled, { css } from 'styled-components';
import { breakPoint } from '../../../style';

export const NavbarMenuList = styled.ul(
        ({ theme: { colors, ruler } }) => css`
                top: 100%;
                position: absolute;
                width: 300px;
                padding: ${ruler * 4.5}px ${ruler * 2}px;
                background-color: ${colors.white.one};
                border: 1px solid ${colors.font.black};
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                right: 64px;
                overflow: hidden;
                transition: 0.2s;
                transform: scaleY(0);
                transform-origin: top;
                &.active {
                        transform: scaleY(1);
                }

                @media ${breakPoint.md} {
                        right: 0;
                }
                @media ${breakPoint.sm} {
                        width: 100%;
                }
        `,
);

export const NavbarDivider = styled.span(
        ({ theme: { colors } }) => css`
                display: block;
                height: 2px;
                background-color: ${colors.font.black};
        `,
);

export const NavbarMenuItem = styled.li(
        ({ theme: { ruler } }) => css`
                &:not(:last-child) {
                        margin-bottom: ${ruler * 3}px;
                }
        `,
);
export const NavbarMenuLink = styled.a(
        ({ theme: { colors, ruler, fontSize } }) => css`
                display: flex;
                align-items: center;
                color: ${colors.font.black};
                font-weight: bold;
                cursor: pointer;
                font-size: ${fontSize.h4}px;
                text-transform: capitalize;
                &:hover {
                        color: ${colors.primary.one};
                }

                & p {
                        margin-left: ${ruler}px;
                }
        `,
);
