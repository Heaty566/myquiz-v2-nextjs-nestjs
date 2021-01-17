import styled, { css } from 'styled-components';

//* Import
import { breakPoint } from '../../../style';
import { BtnLinkContainer } from '../../btnLink/style';
import { SearchBoxContainer } from '../../form/searchBox/style';

export const NavMenuContainer = styled.div(
        ({ theme: { ruler } }) => css`
                display: flex;
                align-items: center;
                justify-content: space-between;

                & > *:not(:first-child) {
                        margin-left: ${ruler * 3}px;
                }

                @media ${breakPoint.md} {
                        & > ${SearchBoxContainer}, & > ${BtnLinkContainer} {
                                display: none;
                        }
                }
        `,
);

export const NavMenuBtn = styled.div(
        ({ theme: { ruler, colors } }) => css`
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-gap: ${ruler * 0.5}px;
                cursor: pointer;
                & > div {
                        transition: 0.2s;
                        background-color: ${colors.primary.one};
                        height: 10px;
                        width: 10px;
                }

                &.active {
                        & > div:nth-child(1),
                        & > div:nth-child(9) {
                                transform: scale(0);
                        }
                }

                &.login {
                        display: none;
                }

                @media ${breakPoint.md} {
                        &.login {
                                display: grid;
                        }
                }
        `,
);

export const NavAvatar = styled.div(() => css``);
