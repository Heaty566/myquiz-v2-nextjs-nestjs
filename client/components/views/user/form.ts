import styled, { css } from 'styled-components';

//* Import
import { breakPoint } from '../../../style';
import { BtnFuncContainer } from '../../btnFunc/style';

export const AuthFormContainer = styled.section(
        ({ theme: { colors, background } }) => css`
                background: ${background.one};
                display: flex;
                justify-content: center;
                align-items: center;
                @media ${breakPoint.sm} {
                        flex-direction: column;
                        background: ${colors.white.one};
                }
        `,
);

export const AuthFormWrapper = styled.form(
        ({ theme: { ruler, borderRadius, background, animation } }) => css`
                padding: ${ruler * 8}px;
                border-radius: ${borderRadius.sm}px;
                width: 430px;
                background-color: white;

                animation: ${animation.fadeIn} 0.4s;

                & > *:not(:last-child) {
                        margin-bottom: ${ruler * 2}px;
                }
                & ${BtnFuncContainer} {
                        width: 100%;
                }

                @media ${breakPoint.sm} {
                        flex: 1;
                        /* background: ${background.one}; */
                        padding: ${ruler * 8}px ${ruler * 2}px;
                        width: 100%;
                        height: 100%;
                }
        `,
);

export const AuthFormTitle = styled.h1(
        ({ theme: { fontSize, ruler, colors } }) => css`
                font-size: ${fontSize[24]}px;
                font-weight: bold;
                text-align: center;
                color: ${colors.primary.one};
                & > *:first-child {
                        margin-right: ${ruler}px;
                }
        `,
);

export const AuthFormLink = styled.a(
        ({ theme: { colors } }) => css`
                display: block;
                text-align: right;
                font-weight: bold;
                color: ${colors.primary.one};

                &:hover {
                        text-decoration: underline;
                }
        `,
);

export const AuthFormSuccessMsg = styled.p(
        ({ theme: { colors, fontSize } }) => css`
                font-weight: bold;
                font-size: ${fontSize[16]}px;
                color: ${colors.green.one};
        `,
);
