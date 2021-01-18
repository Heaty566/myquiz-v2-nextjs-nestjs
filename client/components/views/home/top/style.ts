import styled, { css } from 'styled-components';
import { breakPoint } from '../../../../style';

export const HomeTopContainer = styled.section(
        ({ theme: { background, ruler } }) => css`
                margin-bottom: ${ruler * 8}px;

                & > * {
                        margin-top: ${ruler * 8}px;
                }
                &::before {
                        content: '';
                        top: 0;
                        left: 0;
                        position: absolute;
                        height: 520px;
                        width: 100%;
                        background: ${background.one};
                        clip-path: polygon(0 0, 100% 0, 100% 80%, 0% 100%);
                        z-index: -1;
                }
        `,
);
export const HomeTopTitle = styled.h1(
        ({ theme: { fontSize, colors } }) => css`
                font-size: ${fontSize[40]}px;
                text-align: center;
                color: ${colors.font.white};
                @media ${breakPoint.md} {
                        font-size: ${fontSize[32]}px;
                }
                @media ${breakPoint.sm} {
                        font-size: ${fontSize[24]}px;
                }
        `,
);

//*-------------------Slide Show section-----------
export const HomeSlideShowContainer = styled.div(
        ({ theme: { ruler, colors } }) => css`
                max-width: 1080px;
                margin: ${ruler * 8}px auto 0 auto;
                height: 350px;
                background-color: ${colors.grey.one};
                display: flex;
                overflow: hidden;

                @media ${breakPoint.xl} {
                        width: 90%;
                }
                @media ${breakPoint.md} {
                        width: 95%;
                        height: 500px;
                        flex-direction: column;
                }
        `,
);
export const HomeSlideImage = styled.div(
        ({}) => css`
                flex: 7;
                flex-shrink: 0;
                height: 350px;
                position: relative;
                display: flex;

                @media ${breakPoint.md} {
                        flex: 1;
                        & div {
                                height: 250px;
                        }
                }
        `,
);
export const HomeSlideItem = styled.div(
        () => css`
                height: 100%;
                min-width: 100%;

                & div {
                        width: inherit;

                        height: 350px;
                }

                @media ${breakPoint.md} {
                        & div {
                                height: 250px;
                        }
                }
        `,
);
export const HomeSlideContent = styled.div(
        ({ theme: { ruler, colors } }) => css`
                flex: 3;

                z-index: 10;
                background-color: ${colors.grey.one};
                padding: ${ruler * 2}px ${ruler * 3}px;

                @media ${breakPoint.md} {
                        flex: 1;
                }
        `,
);
export const HomeSlideTitle = styled.h2(
        ({ theme: { colors, fontSize, ruler } }) => css`
                font-size: ${fontSize[24]}px;
                margin-top: ${ruler * 4}px;
                color: ${colors.font.white};
        `,
);
export const HomeSlideText = styled.p(
        ({ theme: { colors, fontSize, ruler } }) => css`
                font-size: ${fontSize[14]}px;
                margin-top: ${ruler * 2}px;
                color: ${colors.font.white};
                opacity: 0.8;
                max-height: 200px;
                text-overflow: ellipsis;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 8;
                -webkit-box-orient: vertical;
                @media ${breakPoint.md} {
                        -webkit-line-clamp: 4;
                }
        `,
);
export const HomeSlideLink = styled.a(
        ({ theme: { colors, fontSize, ruler } }) => css`
                font-size: ${fontSize[16]}px;
                font-weight: bold;
                display: inline-block;
                margin-top: ${ruler * 2}px;
                transition: 0.4s;
                color: ${colors.font.white};
                &:hover {
                        text-decoration: underline;
                }
        `,
);

//*-------------------Counter section-----------
export const HomeCounterContainer = styled.div(
        ({ theme: {} }) => css`
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
        `,
);
export const HomeCounterWrapper = styled.div(
        ({ theme: { ruler } }) => css`
                display: flex;
                align-items: center;
                justify-content: space-evenly;
                width: 50%;

                @media ${breakPoint.lg} {
                        width: 80%;
                }
                @media ${breakPoint.md} {
                        width: 100%;
                }
                @media ${breakPoint.sm} {
                        flex-wrap: wrap;

                        & > * {
                                flex: 50%;
                                margin-bottom: ${ruler * 2}px;
                        }
                }
        `,
);
export const HomeCounterTitle = styled.h2(
        ({ theme: { fontSize, ruler } }) => css`
                font-size: ${fontSize[24]}px;
                margin-bottom: ${ruler * 2}px;
                text-align: center;
                @media ${breakPoint.sm} {
                        font-size: 20px;
                        margin-bottom: ${ruler * 3}px;
                }
        `,
);
export const HomeCounterItem = styled.div(
        ({ theme: {} }) => css`
                text-align: center;
        `,
);
export const HomeCounterItemTitle = styled.h3(
        ({ theme: { colors, fontSize } }) => css`
                font-size: ${fontSize[24]}px;
                color: ${colors.red.one};
        `,
);
export const HomeCounterItemText = styled.p(
        ({ theme: {} }) => css`
                font-weight: bold;
        `,
);
