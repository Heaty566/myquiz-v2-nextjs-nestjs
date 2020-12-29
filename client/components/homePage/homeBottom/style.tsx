import styled, { css } from 'styled-components';
import { Layout } from '../../../style/layout';
import { breakPoint } from '../../../style';

export const HomeBottomContainer = styled.section(
        ({ theme: { colors } }) => css`
                background-color: ${colors.white.two};
                margin: auto;
        `,
);
export const QuizCardContainer = styled.div(
        ({ theme: { ruler } }) => css`
                max-width: 1060px;
                margin: 0 auto;
                padding: ${ruler * 8}px;
                & > *:not(:last-child) {
                        margin-bottom: ${ruler * 4}px;
                }

                @media ${breakPoint.md} {
                        display: none;
                }

                & > ${Layout} {
                        margin-bottom: ${ruler * 2}px;
                }
        `,
);
