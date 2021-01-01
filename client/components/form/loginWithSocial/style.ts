import styled, { css } from 'styled-components';

export const LoginWithSocialItem = styled.div(
        ({ theme: { colors, ruler } }) => css`
                background-color: ${colors.white.one};
                border-radius: 3px;
                box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
                padding: ${ruler}px ${ruler * 2}px;
                display: flex;
                font-weight: bold;
                cursor: pointer;
                align-items: center;

                & > *:last-child {
                        margin-left: ${ruler}px;
                }
        `,
);

export const LoginWithContainer = styled.div`
        & > ${LoginWithSocialItem} {
                margin-bottom: 8px;
        }
`;
