import styled from "styled-components";
import * as CSS from "csstype";

//*todo fix pattern of color

export const Grid = {
        Row: styled.div<{
                alignItems?: CSS.Property.AlignItems;
                justifyContent?: CSS.Property.JustifyContent;
                gutter?: number;
        }>`
                display: grid;
                grid-template-columns: repeat(12, 1fr);
                width: 100%;
                justify-content: ${({ justifyContent = "normal" }) => justifyContent};
                align-items: ${({ alignItems = "normal" }) => alignItems};
                height: auto;
        `,
        Col: styled.div<{ span: number; startPoint?: number }>`
                grid-column: ${({ span, startPoint = "auto" }) => ` ${startPoint} / span ${span} `};
                height: inherit;
        `,
};

export const Layout = styled.div<{
        alignItems?: CSS.Property.AlignItems;
        justifyContent?: CSS.Property.JustifyContent;
        flexDirection?: CSS.Property.FlexDirection;
}>`
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: ${({ flexDirection = "initial" }) => flexDirection};
        align-items: ${({ alignItems = "normal" }) => alignItems};
        justify-content: ${({ justifyContent = "normal" }) => justifyContent};
`;
