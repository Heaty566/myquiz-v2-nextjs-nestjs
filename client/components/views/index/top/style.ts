import styled, { css } from 'styled-components';
import { breakPoint } from '../../../../style';
import { PaginationContainer } from '../../../common/pagination/style';
import { Layout } from '../../../../style/layout';
import { Text } from '../../../../style/typography';

export const ITopContainer = styled.section(
        ({ theme: { background, ruler, fontSize } }) => css`
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

export const BannerContainer = styled(Layout)(
        ({ theme: { colors } }) => css`
                border-radius: 2px;
                z-index: 20;
                width: 75%;
                height: 350px;
                max-width: 1100px;
                background-color: ${colors.grey.one};
                @media ${breakPoint.xl} {
                        width: 90%;
                }

                @media ${breakPoint.md} {
                        flex-direction: column;
                        height: 100%;
                        & > * {
                                height: 250px;
                        }
                }

                @media ${breakPoint.sm} {
                        width: 95%;
                }

                .slide {
                        height: inherit;
                        transition: 0.4s;

                        display: inline-block;
                        height: 350px;
                        width: 100%;

                        & > div {
                                height: inherit;
                        }
                }
        `,
);

export const ImgWrapper = styled.div`
        display: inline-block;
        height: 100%;
        width: 100%;
        & > .slide {
                transition: 1s;
                transform: translateX(100%);
                position: absolute;
                left: 0;
                display: inline;
                width: 100%;
                &.slide__in {
                        transform: translateX(0);
                }
                &.slide__out {
                        transform: translateX(-100%);
                }
                &.slide__reset {
                        transform: translateX(100%);
                        transition: 0s;
                }
        }
`;

export const BannerImg = styled.div`
        flex: 7;
        flex-shrink: 0;
        height: 350px;
        position: relative;
        overflow: hidden;

        @media ${breakPoint.md} {
                height: 250px;
        }
`;

export const BannerSide = styled.div(
        ({ theme: { ruler, colors } }) => css`
                flex: 3;
                background-color: ${colors.grey.one};
                padding: ${ruler * 2}px ${ruler * 3.25}px;

                ${PaginationContainer} {
                        max-width: 120px;
                }

                @media ${breakPoint.md} {
                        padding: ${ruler * 2}px;
                }
        `,
);

export const BannerContent = styled.div(
        ({ theme: { ruler } }) => css`
                margin-top: ${ruler * 8}px;

                & > *:not(:last-child):not(:first-child) {
                        margin: ${ruler * 1.25}px 0;
                        opacity: 0.6;
                }
                & p {
                        max-height: 200px;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-line-clamp: 8;
                        -webkit-box-orient: vertical;
                }

                @media ${breakPoint.xl} {
                        margin-top: ${ruler * 4}px;
                }
        `,
);

export const BannerBtn = styled(Layout)(
        ({ theme: { ruler } }) => css`
                cursor: pointer;

                & > *:first-child {
                        margin-right: ${ruler * 0.5}px;
                }

                & > * {
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
                padding: ${ruler * 1.5}px;

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

                                & > * {
                                        flex: 50%;
                                        margin-bottom: ${ruler}px;
                                }
                        }
                }
        `,
);
