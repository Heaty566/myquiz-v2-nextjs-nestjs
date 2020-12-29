import styled, { css } from 'styled-components';
import { Layout } from '../../style/layout';

export const QuizStar = styled(Layout)(
        ({ theme: { ruler } }) => css`
                & > *:last-child {
                        margin-left: ${ruler * 0.5}px;
                }
        `,
);

export const QuizCardContainer = styled.a(
        ({ theme: { colors, ruler } }) => css`
                background-color: ${colors.white.one};
                padding: ${ruler * 3}px ${ruler * 2}px;
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                border-radius: 5px;
                height: 175px;
                width: 341px;

                & span {
                        opacity: 0.6;
                }

                & p {
                        font-weight: bold;
                }
        `,
);

export const UserPlanCardContainer = styled.a(
        ({ theme: { colors } }) => css`
                width: 400px;
                height: 650px;
                display: block;
                box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
                border-radius: 10px;
                overflow: hidden;
                position: relative;
                padding: 48px 32px 32px 32px;

                &::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        height: 32px;
                        width: 100%;
                        background-color: ${colors.primary.one};
                        display: block;
                }
        `,
);
