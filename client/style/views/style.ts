import styled, { css } from 'styled-components';
import { Layout } from '../../style/layout';
import { breakPoint } from '../../style';

export const NotFoundContainer = styled(Layout)(
        ({ theme: { colors } }) => css`
                background-color: ${colors.white.two};
        `,
);
export const NotFoundWrapper = styled.div(
        ({ theme: { ruler } }) => css`
                text-align: center;
                padding: 16px;

                @media ${breakPoint.sm} {
                        & > h1 {
                                font-size: 96px;
                        }
                }
                & > h1 {
                        font-size: 64px;
                }

                & > * {
                        margin-bottom: ${ruler * 2}px;
                }
        `,
);
