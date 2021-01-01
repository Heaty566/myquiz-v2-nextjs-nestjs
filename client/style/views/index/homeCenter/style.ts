import styled, { css } from 'styled-components';
import { breakPoint } from '../../../index';
import { Layout } from '../../../layout';

export const HomeCenterContainer = styled.section(
        ({ theme: { ruler } }) => css`
                & > * {
                        margin-bottom: ${ruler * 16}px;
                }
        `,
);

export const CategoryCardLayout = styled(Layout)`
        height: 100%;
`;

export const CategoryCard = styled(Layout)(
        ({ theme: { stroke, colors, ruler } }) => css`
                height: 233px;

                padding: ${ruler * 4}px ${ruler * 2}px;
                max-width: 377px;
                width: 100%;
                background-color: ${colors.white.one};
                border: ${stroke.one};
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                border-radius: 5px;
                margin-bottom: ${ruler * 8}px;
                cursor: pointer;
                transition: 0.2s;
                @media ${breakPoint.xl} {
                        margin-right: 0 !important;
                }
                @media ${breakPoint.md} {
                        width: 100%;
                }

                &:hover {
                        transform: scale(1.05);
                }
        `,
);

export const CategoryContainer = styled(Layout)(
        ({ theme: { ruler, colors } }) => css`
                height: 100%;
                min-height: 1200px;
                margin-top: ${16 * ruler}px;
                position: relative;
                padding: 0 ${ruler * 2}px;

                & > * {
                        width: 100%;
                }

                @media ${breakPoint.xl} {
                        flex-direction: row;
                        & > * {
                                flex-direction: column;
                        }

                        & > *:first-child {
                                margin-right: ${ruler * 4}px;
                        }
                }

                @media ${breakPoint.lg} {
                        flex-direction: column;
                        & > *:first-child {
                                margin-right: 0;
                        }
                }

                &::before {
                        content: '';
                        position: absolute;
                        display: block;
                        height: 100%;
                        width: 100%;
                        z-index: -10;
                        clip-path: polygon(0 6.67%, 100% 0, 100% 94%, 0% 100%);
                        background-color: ${colors.white.two};
                }
        `,
);

export const FeatureContainer = styled.div(
        ({ theme: { ruler, fontSize } }) => css`
                & > * {
                        margin-bottom: ${ruler * 4}px;
                }

                @media ${breakPoint.lg} {
                        & > h1 {
                                font-size: ${fontSize.h3}px;
                        }

                        & > *:not(:first-child) {
                                margin-bottom: 0;
                        }

                        & > ${Layout} {
                                flex-direction: column;
                        }
                }
        `,
);

export const FeatureCard = styled.div`
        text-align: center;
        width: 300px;

        @media ${breakPoint.lg} {
                margin-right: 0 !important;
                margin-bottom: 32px;
        }
`;
