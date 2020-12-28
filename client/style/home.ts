import styled, { css } from "styled-components";
import { breakPoint } from "./index";
import { PaginationContainer } from "../components/pagination/style";
import {} from "./typography";

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
        `
);

export const HomeBannerImage = styled.div`
        flex: 7;
        flex-shrink: 0;
`;

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
        `
);

export const HomeBannerSide = styled.div(
        ({ theme: { ruler, colors } }) => css`
                background-color: ${colors.grey.one};
                padding: ${ruler * 2}px ${ruler * 3.25}px;
                flex: 3;
                ${PaginationContainer} {
                        max-width: 120px;
                }

                @media ${breakPoint.xl} {
                        padding: ${ruler * 2}px;
                }
        `
);
export const HomeBannerContainer = styled.div(
        ({}) => css`
                position: relative;
                left: 50%;
                transform: translateX(-50%);
                border-radius: 2px;
                overflow: hidden;
                z-index: 20;
                width: 75%;
                height: 350px;
                max-width: 1100px;

                @media ${breakPoint.xl} {
                        width: 90%;
                }
        `
);

export const HomeContainerTop = styled.section(
        ({ theme: { background, ruler } }) => css`
                padding-top: ${ruler * 8}px;
                height: calc(524px + ${ruler * 8}px);
                width: 100%;
                position: relative;

                &::before {
                        content: "";
                        clip-path: polygon(0 0, 100% 0, 100% 80%, 0% 100%);
                        background: ${background.one};
                        height: 100%;
                        max-height: 524px;
                        width: 100%;
                        display: block;
                        position: absolute;
                }
                @media ${breakPoint.md} {
                        min-height: calc(400px + ${ruler * 8}px);
                }

                & > * {
                        position: relative;
                        z-index: 10;
                        margin-top: ${ruler * 8}px;
                }
        `
);
