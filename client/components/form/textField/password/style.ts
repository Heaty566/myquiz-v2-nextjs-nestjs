import styled, { css } from 'styled-components';
import { TextInputCommon, TextFieldInput } from '../style.share';

export const TextFieldPasswordInput = styled.div(
        ({ theme: { ruler } }) => css`
                display: flex;
                ${TextInputCommon}
                & ${TextFieldInput} {
                        margin-right: ${ruler * 0.5}px;
                }

                & img {
                        cursor: pointer;
                }
        `,
);
