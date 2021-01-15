import styled, { css } from 'styled-components';

export const FormWithSocialItem = styled.div(
        ({ theme: { colors, ruler } }) => css`
                background-color: ${colors.white.one};
                border-radius: 3px;

                padding: ${ruler}px ${ruler * 2}px;
                display: flex;
                font-weight: bold;
                cursor: pointer;
                align-items: center;
                box-shadow: 0 2px 2px 0 rgba(41, 48, 59, 0.24), 0 0 2px 0 rgba(41, 48, 59, 0.12);
                & > *:last-child {
                        margin-left: ${ruler}px;
                }
        `,
);

export const FormWithContainer = styled.div(
        ({ theme: { ruler } }) => css`
                & > ${FormWithSocialItem} {
                        margin-bottom: ${ruler}px;
                }
        `,
);
