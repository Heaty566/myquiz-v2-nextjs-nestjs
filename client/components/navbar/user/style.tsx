import styled, { css } from 'styled-components';
import { Layout } from '../../../style/layout';

export const NavbarUserContainer = styled(Layout)(() => css``);

export const NavbarUserBtn = styled.div(
        ({ theme: { ruler, colors } }) => css`
                margin-left: ${ruler}px;
                cursor: pointer;
                &:hover div {
                        background-color: ${colors.primary.one};
                }

                & div {
                        transition: 0.2s;
                        background-color: ${colors.primary.two};
                        border-radius: 50%;
                        width: ${ruler}px;
                        height: ${ruler}px;
                }

                & div:nth-child(2) {
                        margin: ${0.5 * ruler}px 0;
                }
        `,
);
