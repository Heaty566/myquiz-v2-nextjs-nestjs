import styled, { css } from 'styled-components';

//* Import
import { breakPoint } from '../../style';

export const FooterContainerTop = styled.div(
        ({ theme: { ruler } }) => css`
                margin-bottom: ${ruler * 2}px;
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

export const FooterListContainer = styled.div(({}) => css``);

export const FooterList = styled.ul(
        ({ theme: { ruler } }) => css`
                display: inline-block;
                @media ${breakPoint.sm} {
                        display: block;
                }

                height: 100%;
                vertical-align: top;
                margin-right: ${ruler * 4}px;
        `,
);
export const FooterItem = styled.li(
        ({ theme: { ruler } }) => css`
                display: block;
                margin: ${ruler}px;
        `,
);
export const FooterLink = styled.a(
        ({ theme: { colors } }) => css`
                display: block;
                color: ${colors.font.white};
                font-weight: 500;
                transition: 0.2s;
                &:hover {
                        text-decoration: underline;
                }
        `,
);

export const FooterAuthor = styled.a(
        ({ theme: { colors, fontSize } }) => css`
                text-align: center;
                display: block;
                color: ${colors.font.white};
                font-size: ${fontSize[14]}px;
        `,
);
