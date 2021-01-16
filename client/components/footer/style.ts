import styled, { css } from 'styled-components';

//* Import
import { LangContainer } from '../common/langSelect/style';
import { breakPoint } from '../../style';
import { Layout } from '../../style/layout';

export const FooterContainerTop = styled(Layout)(
        ({ theme: { ruler } }) => css`
                margin-bottom: ${ruler * 2}px;
                @media ${breakPoint.md} {
                        & > ${LangContainer} {
                                display: none;
                        }
                }
        `,
);

export const FooterContainer = styled.footer(
        ({ theme: { ruler, colors } }) => css`
                padding: ${ruler * 4}px ${ruler * 8}px;
                background-color: ${colors.primary.one};
                @media ${breakPoint.md} {
                        padding: ${ruler * 8}px ${ruler * 2}px;
                }
        `,
);

export const FooterColContainer = styled(Layout)(
        ({}) => css`
                @media ${breakPoint.md} {
                        flex-direction: column;
                }
        `,
);

export const FooterCol = styled.ul(
        ({ theme: { ruler } }) => css`
                & > li {
                        cursor: pointer;
                        margin-bottom: ${ruler * 0.5}px;
                }
                @media ${breakPoint.md} {
                        & > li {
                                margin-bottom: ${ruler}px;
                        }
                }
        `,
);

export const FooterAuthor = styled.div(
        ({ theme: { colors, fontSize } }) => css`
                text-align: center;
                color: ${colors.font.white};
                font-size: ${fontSize.p3}px;
        `,
);
