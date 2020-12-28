import styled, { css } from 'styled-components';
import { breakPoint } from '../../style';

export const NavbarContainer = styled.nav(
        ({ theme: { ruler, colors } }) => css`
                position: fixed;
                width: 100%;
                z-index: 999;
                padding: 0 ${ruler * 8}px;
                box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
                background: ${colors.white.one};
                height: ${ruler * 8}px;
                display: flex;
                align-items: center;
                justify-content: stretch;
                min-width: 320px;

                @media ${breakPoint.md} {
                        padding: 0 ${ruler * 2}px;
                }
        `,
);

export const NavbarLogo = styled.a`
        display: flex;
        align-items: center;
        width: 124px;
        height: 32px;
        flex-shrink: 0;
        &:hover span {
        }
`;

export const NavbarBtnMobile = styled.button(
        ({ theme: { ruler, colors } }) => css`
                display: none;
                width: 48px;
                cursor: pointer;

                @media ${breakPoint.md} {
                        display: block;
                }

                & > span {
                        transition: 0.2s;
                        height: 6px;
                        width: 100%;
                        display: block;
                        background-color: ${colors.primary.one};
                        &:nth-child(2) {
                                margin: ${ruler}px 0;
                                width: 75%;
                        }
                }

                &.active span:nth-child(2) {
                        transform: translateX(33%);
                }
        `,
);

export const NavbarLeft = styled.div(
        ({ theme }) => css`
                height: auto;
                display: flex;

                @media ${breakPoint.md} {
                        display: none;
                }

                & > * {
                        margin-left: ${theme.ruler * 3}px;
                }
        `,
);
