import styled, { css } from 'styled-components';

//* Import
import { TextInputCommon, FieldInput } from '../style.share';

export const TextFieldPasswordInput = styled.div(
        ({ theme: { ruler } }) => css`
                display: flex;
                ${TextInputCommon}
                & ${FieldInput} {
                        margin-right: ${ruler * 0.5}px;
                }

                & img {
                        cursor: pointer;
                }
        `,
);
