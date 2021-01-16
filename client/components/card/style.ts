import styled, { css } from 'styled-components';

//* Import
import { Layout } from '../../style/layout';
import { BtnLinkContainer } from '../button/style';

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

export const UserPlanCheckCol = styled(Layout)(
        ({ theme: { ruler } }) => css`
                padding: ${ruler * 2}px;
                & > *:last-child {
                        margin-left: ${ruler}px;
                }
        `,
);

export const UserPlanCardContainer = styled.div<{ $color: 'one' | 'two' }>(
        ({ theme: { colors, ruler }, $color }) => css`
                width: 100%;
                max-width: 400px;
                height: 650px;

                display: block;
                box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
                border-radius: 10px;
                overflow: hidden;
                position: relative;
                padding: 48px 32px 32px 32px;

                & > * {
                        margin-bottom: ${ruler * 2}px;
                }

                & ${BtnLinkContainer} {
                        padding: ${ruler * 2}px ${ruler * 3}px;
                }

                & span {
                        opacity: 0.6;
                        font-weight: 300;
                }

                &::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        height: 32px;
                        width: 100%;
                        background-color: ${colors.primary[$color]};
                        display: block;
                }
        `,
);
