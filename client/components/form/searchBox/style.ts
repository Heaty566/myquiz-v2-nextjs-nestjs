import styled from "styled-components";
import { variable } from "../../../styled";

//*todo fix color

export const SearchBoxContainer = styled.div`
        background-color: ${variable.colors.primary.two};
        border-radius: 3px;
        min-width: 200px;
        height: 32px;
        display: grid;
        grid-template-columns: 1fr 32px;
        overflow: hidden;
        transition: 0.2s;
        &:focus-within {
                box-shadow: 0 0 0 3px rgba(83, 117, 226, 0.3);
        }
`;

export const SearchBoxTextField = styled.input`
        height: inherit;
        text-indent: ${variable.ruler}px;
        font-size: 16px;
        color: ${variable.colors.font.white};

        &::placeholder {
                color: ${variable.colors.font.white};
                opacity: 0.6;
        }
`;

export const SearchBoxIcon = styled.button`
        background-color: ${variable.colors.primary.one};
        padding: ${variable.ruler}px;
        height: inherit;
`;
