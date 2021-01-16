import styled, { css } from 'styled-components';

//* Import
import { Layout } from '../../../style/layout';
import { BtnLinkContainer } from '../../button/link/style';

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
