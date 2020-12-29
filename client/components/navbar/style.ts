import styled, { css } from 'styled-components';
import { breakPoint } from '../../style';
import { Layout } from '../../style/layout';

export const NavbarContainer = styled(Layout)(
        ({ theme: { ruler, colors } }) => css`
                position: fixed;
                width: 100%;
                z-index: 999;
                top: 0;
                left: 0;
                padding: 0 ${ruler * 8}px;
                box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
                background: ${colors.white.one};
                height: ${ruler * 8}px;
                @media ${breakPoint.md} {
                        padding: 0 ${ruler * 2}px;
                }
        `,
);

export const NavbarBrand = styled.a`
        flex-shrink: 0;
`;

export const NavbarBtnMobile = styled.button(
        ({ theme: { ruler, colors } }) => css`
                display: none;
                width: 48px;
                cursor: pointer;

                @media ${breakPoint.md} {
                        display: block;
                }

                & > * {
                        transition: 0.2s;
                        height: 6px;
                        background-color: ${colors.primary.one};

                        &:nth-child(2) {
                                margin: ${ruler}px 0;
                                width: 75%;
                        }
                }

                &.active *:nth-child(2) {
                        transform: translateX(33%);
                }
        `,
);

export const NavbarLeft = styled(Layout)(
        ({ theme }) => css`
                & > * {
                        margin-left: ${theme.ruler * 3}px;
                }

                @media ${breakPoint.md} {
                        display: none !important;
                }
        `,
);
