import styled, { css } from 'styled-components';
import { breakPoint } from '../../style/index';
import { PaginationContainer } from '../../components/pagination/style';
import { Layout } from '../../style/grid';
import { Text } from '../../style/typography';

//*-------------------------Home--Top
export const HomeContainerTop = styled.section(
        ({ theme: { background, ruler, fontSize } }) => css`
                padding-top: ${ruler * 8}px;
                width: 100%;
                position: relative;

                &::before {
                        content: '';
                        clip-path: polygon(0 0, 100% 0, 100% 80%, 0% 100%);
                        background: ${background.one};
                        height: 100%;
                        max-height: 524px;
                        width: 100%;
                        display: block;
                        position: absolute;
                        z-index: -10;
                }
                @media ${breakPoint.md} {
                        min-height: calc(400px + ${ruler * 8}px);
                        height: auto;
                        & > ${Text} {
                                font-size: ${fontSize.h3}px;
                        }
                }

                & > * {
                        margin: ${ruler * 8}px auto auto auto;
                }
        `,
);

export const HomeBannerContainer = styled.div(
        ({}) => css`
                border-radius: 2px;
                z-index: 20;
                width: 75%;
                height: 350px;
                max-width: 1100px;

                @media ${breakPoint.xl} {
                        width: 90%;
                }

                @media ${breakPoint.md} {
                        height: auto;
                        ${Layout} {
                                flex-direction: column;
                                height: 100%;
                        }
                }

                @media ${breakPoint.sm} {
                        width: 95%;
                }
        `,
);

export const HomeBannerImage = styled.div`
        flex: 7;
        flex-shrink: 0;
        @media ${breakPoint.md} {
                flex: none;
                height: 250px;
        }
`;

export const HomeBannerSide = styled.div(
        ({ theme: { ruler, colors } }) => css`
                background-color: ${colors.grey.one};
                padding: ${ruler * 2}px ${ruler * 3.25}px;
                flex: 3;
                ${PaginationContainer} {
                        max-width: 120px;
                }
                @media ${breakPoint.md} {
                        flex: none;
                        min-height: 250px;
                }
                @media ${breakPoint.xl} {
                        padding: ${ruler * 2}px;
                }
        `,
);

export const HomeBannerContent = styled.div(
        ({ theme: { ruler } }) => css`
                margin-top: ${ruler * 8}px;

                & > *:not(:last-child):not(:first-child) {
                        margin: ${ruler * 1.25}px 0;
                        opacity: 0.6;
                }

                @media ${breakPoint.xl} {
                        margin-top: ${ruler * 4}px;
                }
        `,
);

export const HomeBannerBtn = styled.a(
        ({ theme: { ruler } }) => css`
                display: flex;
                align-items: center;

                cursor: pointer;

                & > *:first-child {
                        margin-right: ${ruler * 0.5}px;
                }

                & > *:last-child {
                        transition: 0.2s;
                }

                &:hover > *:last-child {
                        transform: translateX(5px);
                }
        `,
);

export const HomeFeatureContainer = styled.section(
        ({ theme: { colors, ruler, fontSize } }) => css`
                max-width: 700px;

                & > *:not(:last-child) {
                        margin-bottom: ${ruler * 2}px;
                }

                ${Text} > span {
                        font-size: 18px;

                        color: ${colors.red.one};
                }
                @media ${breakPoint.md} {
                        ${Text} {
                                font-size: ${fontSize.h4}px;
                        }

                        ${Layout} {
                                flex-wrap: wrap;
                                & > *:first-child {
                                        margin-bottom: ${ruler * 3}px;
                                }

                                & > * {
                                        flex: 50%;
                                        margin-bottom: ${ruler}px;
                                }
                        }
                }
                @media ${breakPoint.sm} {
                        padding: ${ruler * 1.5}px;
                }
        `,
);

//*-------------------------Home--Center

export const HomeContainerCenter = styled.section(
        ({ theme: {} }) => `
`,
);
