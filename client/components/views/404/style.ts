import styled, { css } from 'styled-components';

export const NotFoundContainer = styled.section(
        ({ theme: { colors } }) => css`
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: ${colors.white.two};
        `,
);

export const NotFoundTitle = styled.h1(
        ({ theme: { ruler } }) => css`
                font-size: ${ruler * 8}px;
        `,
);
export const NotFoundText = styled.h4(({ theme: {} }) => css``);

export const NotFoundWrapper = styled.div(
        ({ theme: { ruler } }) => css`
                text-align: center;
                padding: 16px;

                & > * {
                        margin-bottom: ${ruler * 2}px;
                }
        `,
);
