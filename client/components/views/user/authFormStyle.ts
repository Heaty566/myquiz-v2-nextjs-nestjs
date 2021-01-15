import styled, { css } from 'styled-components';
import { breakPoint } from '../../../style';
import { Layout } from '../../../style/layout';
import { BtnFuncContainer } from '../../button/style';

export const AuthFormContainer = styled.div(
        ({ theme: { ruler, fontSize, animation, colors } }) => css`
                animation: 0.2s ${animation.fadeIn};
                padding: ${ruler * 8}px;
                background-color: ${colors.white.one};
                border-radius: 5px;
                width: 432px;
                @media ${breakPoint.sm} {
                        margin: 0 ${ruler * 2}px;
                        padding: ${ruler * 4}px ${ruler * 2}px;
                }
                & > *:not(:last-child) {
                        margin-bottom: ${ruler * 3}px;
                }

                & > ${AuthForm} {
                        & > *:not(:last-child) {
                                margin-bottom: ${ruler * 2}px;
                        }
                }

                & ${BtnFuncContainer} {
                        width: 100%;
                        font-size: ${fontSize.h4}px;
                        font-weight: bold;
                }
        `,
);
export const AuthExtraLink = styled.a(
        ({ theme: { colors, fontSize } }) => css`
                display: block;
                font-size: ${fontSize.h4}px;
                font-weight: bold;
                text-align: right;
                color: ${colors.primary.one};
        `,
);
export const AuthForm = styled.form`
        height: 100%;
        width: 100%;
`;
export const AuthContainer = styled(Layout)(
        ({ theme: { background } }) => css`
                background: ${background.one};
        `,
);
