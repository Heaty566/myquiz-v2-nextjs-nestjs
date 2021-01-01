import styled, { css } from 'styled-components';
import { Circle } from '../common/loading/style';

const BtnCommonStyle = css(
        ({ theme }) => css`
                background-color: ${theme.colors.primary.one};
                border-radius: 3px;
                padding: ${theme.ruler}px ${theme.ruler * 2}px;
                color: ${theme.colors.font.white};
                display: inline-block;
                transition: 0.2s;
                position: relative;
                cursor: pointer;

                &:hover {
                        background-color: ${theme.colors.primary.five};
                }
        `,
);

export const BtnCircle = styled(Circle)(
        ({ theme: { colors, animation } }) => css`
                display: block;
                width: inherit;
                height: inherit;
                position: absolute;
                left: 50%;
                height: 24px;
                width: 24px;
                top: 50%;
                transform: translate(-50%, -50%);
                & div {
                        border-radius: 50%;
                        position: absolute;
                        width: 24px;
                        height: 24px;
                        border: 3px solid ${colors.white.one};
                        animation: ${animation.rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
                        border-color: ${colors.white.one} transparent transparent transparent;
                }

                & div:nth-child(1) {
                        animation-delay: -0.45s;
                }
                & div:nth-child(2) {
                        animation-delay: -0.3s;
                }
                & div:nth-child(3) {
                        animation-delay: -0.15s;
                }
        `,
);

export const BtnFuncContainer = styled.button`
        ${BtnCommonStyle}
`;
export const BtnLinkContainer = styled.a`
        ${BtnCommonStyle}
`;
