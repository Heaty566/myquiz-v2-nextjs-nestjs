import styled, { css } from 'styled-components';
import { breakPoint } from '../../../../style';
import { BtnLinkContainer } from '../../../btnLink/style';

export const HomeBottomContainer = styled.main(
        ({ theme: { ruler } }) => css`
                display: flex;
                justify-content: center;
                align-items: center;
                margin: ${ruler * 8}px 0;
                flex-direction: column;
        `,
);

//* -----------Home Quiz Section ------------------------
export const HomeQuizCardContainer = styled.section(
        ({ theme: { ruler, colors } }) => css`
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                width: 100%;
                background-color: ${colors.white.two};
                padding: ${ruler * 8}px 0;
                @media ${breakPoint.lg} {
                        display: none;
                }
        `,
);
export const HomeQuizCardWrapper = styled.div(
        ({ theme: { ruler } }) => css`
                display: grid;
                grid-template-columns: repeat(3, 286px);
                column-gap: ${ruler * 8}px;
                row-gap: ${ruler * 4}px;
        `,
);
export const HomeQuizCardItem = styled.a(
        ({ theme: { ruler, colors } }) => css`
                width: 286px;
                height: 145px;
                display: inline-block;
                border-radius: 3px;
                background-color: ${colors.white.one};
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                padding: ${ruler * 3}px ${ruler * 2}px;
                color: ${colors.font.black};
        `,
);
export const HomeQuizCardMainTitle = styled.h1(
        ({ theme: { fontSize, ruler, colors } }) => css`
                font-size: ${fontSize[40]}px;
                color: ${colors.primary.one};
                margin-bottom: ${ruler * 3}px;
        `,
);
export const HomeQuizCardTitle = styled.h2(
        ({ theme: { fontSize } }) => css`
                font-size: ${fontSize[16]}px;
        `,
);
export const HomeQuizCardBottom = styled.div(
        () => css`
                display: flex;
                justify-content: space-between;
                align-items: center;
        `,
);
export const HomeQuizCardAuthor = styled.p(
        ({ theme: { fontSize, ruler } }) => css`
                font-size: ${fontSize[14]}px;
                opacity: 0.6;
                margin-bottom: ${ruler * 3}px;
        `,
);
export const HomeQuizCardQuestion = styled.p(
        () => css`
                font-weight: bold;
        `,
);
export const HomeQuizCardCounter = styled.div(
        () => css`
                font-weight: bold;
                line-height: 16px;
        `,
);

//* -----------Home Member Section ----------------------
export const HomeMemberCardContainer = styled.section(
        ({ theme: { ruler } }) => css`
                margin: ${ruler * 8}px ${ruler * 2}px;
        `,
);
export const HomeMemberCardMainTitle = styled.h1(
        ({ theme: { fontSize, ruler } }) => css`
                font-size: ${fontSize[40]}px;
                text-align: center;
                margin-bottom: ${ruler * 8}px;
                @media ${breakPoint.md} {
                        font-size: ${fontSize[24]}px;
                }
        `,
);
export const HomeMemberCardWrapper = styled.div(
        ({ theme: { ruler } }) => css`
                display: flex;
                justify-content: center;
                align-items: stretch;

                & > ${HomeMemberCardItem}:not(:last-child) {
                        margin-right: ${ruler * 8}px;
                }

                @media ${breakPoint.lg} {
                        align-items: center;
                        flex-direction: column;
                        & > ${HomeMemberCardItem}:not(:last-child) {
                                margin-right: 0;
                                margin-bottom: ${ruler * 8}px;
                        }
                }
        `,
);
export const HomeMemberCardItem = styled.div<{ $type: 'one' | 'two' }>(
        ({ theme: { ruler, colors }, $type }) => css`
                position: relative;
                text-align: center;
                display: inline-block;

                padding: ${ruler * 10}px ${ruler * 4}px ${ruler * 8}px ${ruler * 4}px;
                border-radius: 10px;
                overflow: hidden;
                border: 2px solid ${colors.primary[$type]};
                width: 395px;
                @media ${breakPoint.sm} {
                        width: 100%;
                        padding: ${ruler * 10}px ${ruler}px ${ruler * 8}px ${ruler}px;
                }
                & > *:not(:last-child) {
                        margin-bottom: ${ruler * 2}px;
                }

                & > ${BtnLinkContainer} {
                        width: 100%;
                }

                &::before {
                        content: '';
                        position: absolute;
                        display: block;
                        background-color: ${colors.primary[$type]};
                        top: 0;
                        left: 0;
                        height: 64px;
                        width: 100%;
                }
        `,
);
export const HomeMemberCardTitle = styled.h2(
        ({ theme: { fontSize } }) => css`
                font-size: ${fontSize[32]}px;
        `,
);
export const HomeMemberCardSubTitle = styled.p(
        ({ theme: { ruler } }) => css`
                text-align: left;
                font-weight: bold;
                margin: 0 ${ruler * 2}px;
        `,
);
export const HomeMemberCardPrice = styled.h3(
        ({ theme: { fontSize } }) => css`
                font-size: ${fontSize[40]}px;

                & > span {
                        font-size: ${fontSize[16]}px;
                        font-weight: 400;
                }
        `,
);
export const HomeMemberCardList = styled.ul(
        ({ theme: { ruler } }) => css`
                text-align: left;
                margin: 0 ${ruler * 2}px;
                & > *:not(:last-child) {
                        margin-bottom: ${ruler * 2}px;
                }
        `,
);
export const HomeMemberCardListItem = styled.li(
        () => css`
                display: flex;
                align-items: center;
                font-weight: bold;
                & > div {
                        margin-right: 16px !important;
                }
        `,
);
