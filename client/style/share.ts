import styled, { css } from 'styled-components';
import { Layout } from './layout';
import { breakPoint } from '.';

export const BackgroundLinear = styled(Layout)(
        ({ theme: { background } }) => css`
                background: ${background.one};
        `,
);

export const FormContainer = styled.div(
        ({ theme: { colors, ruler } }) => css`
                padding: ${ruler * 8}px;
                background-color: ${colors.white.one};
                border-radius: 5px;
                width: 432px;
                @media ${breakPoint.sm} {
                        margin: 0 ${ruler * 2}px;
                        padding: ${ruler * 8}px ${ruler * 2}px;
                }
        `,
);
