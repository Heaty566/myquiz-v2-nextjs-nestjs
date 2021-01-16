import styled, { css } from 'styled-components';

//* Import
import { Layout } from '../../../style/layout';

export const CirclePaginationBtn = styled.button(
        ({ theme: { colors } }) => css`
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: ${colors.secondary.four};
                cursor: pointer;
                transition: 0.2s;

                &.active {
                        background-color: ${colors.primary.one};
                }
        `,
);
export const PaginationContainer = styled(Layout)``;
