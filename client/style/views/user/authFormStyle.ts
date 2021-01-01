import styled, { css } from 'styled-components';

import { BtnFuncContainer } from '../../../components/button/style';
import { BackgroundLinear } from '../../share';
import { FormContainer } from '../../share';

export const AuthFormContainer = styled(FormContainer)(
        ({ theme: { ruler, fontSize, animation } }) => css`
                animation: 0.2s ${animation.fadeIn};

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
export const AuthContainer = styled(BackgroundLinear)(({}) => css``);
