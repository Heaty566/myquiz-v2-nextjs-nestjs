import styled, { css } from 'styled-components';
import { breakPoint } from '../../../../style';

export const HomeCenterContainer = styled.div(({ theme: {} }) => css``);
//* --------------- Home Card Section --------------------------------------
export const HomeCardMainTitle = styled.h1(
        ({ theme: { ruler, colors, fontSize } }) => css`
                margin-bottom: ${ruler * 4}px;
                color: ${colors.primary.two};
                font-size: ${fontSize[40]}px;
                text-align: center;
                @media ${breakPoint.sm} {
                        font-size: ${fontSize[24]}px;
                }
        `,
);
export const HomeCardContainer = styled.section(
        ({ theme: { ruler, colors } }) => css`
                margin: ${ruler * 8}px 0;
                min-height: 800px;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                &::before {
                        content: '';
                        display: block;
                        position: absolute;
                        height: 100%;
                        top: 45%;
                        left: 50%;
                        width: 100%;
                        background-color: ${colors.white.two};
                        z-index: -1;
                        transform: skewY(-4deg) translate(-50%, -50%);
                }
                @media ${breakPoint.sm} {
                        height: 100%;
                }
        `,
);
export const HomeCardWrapper = styled.div(
        ({ theme: { ruler } }) => css`
                display: grid;

                column-gap: ${ruler * 8}px;
                row-gap: ${ruler * 4}px;
                padding: 0 16px;
                grid-template-columns: repeat(3, 380px);
                @media ${breakPoint.xll} {
                        grid-template-columns: repeat(2, 380px);
                }
                @media ${breakPoint.lg} {
                        grid-template-columns: repeat(2, 300px);
                }
                @media ${breakPoint.md} {
                        grid-template-columns: repeat(2, 1fr);
                        grid-gap: 16px;
                }
                @media ${breakPoint.sm} {
                        grid-template-columns: repeat(1, 1fr);
                }
        `,
);
export const HomeCardItem = styled.a(
        ({ theme: { ruler, colors } }) => css`
                max-width: 380px;
                min-height: 180px;
                display: flex;
                border-radius: 5px;
                background-color: ${colors.white.one};
                border: 1px solid ${colors.dark.one};
                padding: ${ruler * 2}px ${ruler * 4}px;
                transition: 0.2s;
                @media ${breakPoint.lg} {
                        width: 300px;
                }
                @media ${breakPoint.md} {
                        width: 100%;
                        padding: ${ruler * 2}px;
                }
                @media ${breakPoint.sm} {
                        margin: 0 auto;
                }

                &:hover {
                        transform: scale(1.05);
                        & ${HomeCardTitle} {
                                color: ${colors.primary.one};
                        }
                }
        `,
);
export const HomeCardImage = styled.div(
        () => css`
                flex-shrink: 0;
                flex: 1;
        `,
);
export const HomeCardTitle = styled.h2(
        ({ theme: { ruler, fontSize, colors } }) => css`
                margin-bottom: ${ruler * 2}px;
                font-size: ${fontSize[24]}px;
                font-weight: bold;
                transition: 0.2s;
                color: ${colors.primary.one};
        `,
);
export const HomeCardContent = styled.div(
        ({ theme: { ruler } }) => css`
                flex: 1;
                margin-right: ${ruler * 2}px;
                @media ${breakPoint.md} {
                        margin-right: 0;
                        margin-bottom: 16px;
                }
        `,
);
export const HomeCardList = styled.ul(
        ({ theme: { ruler } }) => css`
                margin-right: ${ruler}px;
        `,
);
export const HomeCardListItem = styled.li(
        ({ theme: { colors } }) => css`
                display: inline-block;
                opacity: 0.8;
                width: 100%;
                color: ${colors.font.black};
        `,
);
export const HomeCardListText = styled.h3(
        ({ theme: { colors, fontSize } }) => css`
                display: inline-block;
                opacity: 0.8;
                width: 100%;
                font-size: ${fontSize[16]}px;

                color: ${colors.font.black};
        `,
);

//*-------------------Home Features section -------------------------

export const HomeFeatureContainer = styled.section(
        () =>
                css`
                        min-height: 700px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                `,
);
export const HomeFeatureMainTitle = styled.h1(
        ({ theme: { fontSize, ruler } }) => css`
                font-size: ${fontSize[40]}px;
                text-align: center;
                margin-bottom: ${ruler * 4}px;
                @media ${breakPoint.md} {
                        font-size: ${fontSize[24]}px;
                }
        `,
);
export const HomeFeatureWrapper = styled.div(
        ({ theme: { ruler } }) => css`
                display: grid;
                grid-template-columns: repeat(3, 280px);
                column-gap: ${ruler * 8}px;
                row-gap: ${ruler * 4}px;

                @media ${breakPoint.lg} {
                        grid-template-columns: repeat(2, 280px);
                        column-gap: ${ruler * 4}px;
                }
                @media ${breakPoint.md} {
                        grid-template-columns: repeat(1, 280px);
                        column-gap: ${ruler * 4}px;
                }
        `,
);
export const HomeFeatureItem = styled.div(
        () => css`
                display: flex;
                align-items: center;

                flex-direction: column;
                max-width: 280px;
                text-align: center;
        `,
);
export const HomeFeatureImage = styled.div(
        ({ theme: { ruler } }) => css`
                margin-bottom: ${ruler * 2}px;
        `,
);
export const HomeFeatureTitle = styled.h2(
        ({ theme: { ruler } }) => css`
                margin-bottom: ${ruler}px;
        `,
);
export const HomeFeatureText = styled.p(
        () => css`
                opacity: 0.8;
        `,
);
