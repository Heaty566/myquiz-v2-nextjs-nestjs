import styled, { css } from 'styled-components';
import { Layout } from '../../../style/layout';
import { breakPoint } from '../../../style';

export const HomeBottomContainer = styled.section(
        ({ theme: {} }) => css`
                margin: auto;

                @media ${breakPoint.md} {
                        display: none;
                }
        `,
);

export const QuizCardContainer = styled.div(
        ({ theme: { colors } }) => css`
                background-color: ${colors.white.two};
                width: 100vw;
        `,
);

export const QuizCardWrapper = styled.div(
        ({ theme: { ruler } }) => css`
                max-width: 1060px;
                margin: 0 auto;
                padding: ${ruler * 8}px;

                & > *:not(:last-child) {
                        margin-bottom: ${ruler * 4}px;
                }

                & > ${Layout} {
                        margin-bottom: ${ruler * 2}px;
                }
        `,
);

export const UserPlanCardContainer = styled(Layout)(
        ({ theme: { ruler } }) => css`
                padding: ${ruler * 8}px ${ruler * 2}px;
        `,
);
