import styled, { css } from 'styled-components';

//* Import
import { Layout } from '../../../style/layout';

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
                transition: 0.2s;

                & span {
                        opacity: 0.6;
                }

                & p {
                        font-weight: bold;
                }

                &:hover {
                        transform: scale(1.05);
                }
        `,
);
